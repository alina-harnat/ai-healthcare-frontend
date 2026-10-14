'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  securityApi,
  type TwoFactorInput,
  type TwoFactorMethod,
  type TwoFactorType,
} from '../../api';

type SetupState =
  | { type: 'TOTP'; qrCode: string }
  | { type: 'EMAIL'; challengeToken: string };

type CodeFormProps = {
  submitLabel: string;
  loading: boolean;
  onSubmit: (code: string) => Promise<void>;
  onCancel?: () => void;
  cancelLabel?: string;
  error?: string;
};

function CodeForm({
  submitLabel,
  loading,
  onSubmit,
  onCancel,
  cancelLabel,
  error,
}: CodeFormProps) {
  const t = useTranslations('security');
  const schema = z.object({
    code: z.string().trim().min(1, t('codeRequired')),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: '' },
  });

  return (
    <Box component='form' onSubmit={handleSubmit(({ code }) => onSubmit(code))}>
      <Stack spacing={2}>
        <TextField
          autoComplete='one-time-code'
          autoFocus
          fullWidth
          label={t('verificationCode')}
          size='small'
          error={!!errors.code}
          helperText={errors.code?.message}
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
          {...register('code')}
        />
        {error && <Alert severity='error'>{error}</Alert>}
        <Stack
          direction='row'
          spacing={1}
          sx={{ justifyContent: 'flex-end' }}
        >
          {onCancel && (
            <Button onClick={onCancel} disabled={loading}>
              {cancelLabel}
            </Button>
          )}
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? <CircularProgress size={20} /> : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export function SecurityPage() {
  const t = useTranslations('security');
  const {
    data,
    loading: methodsLoading,
    error: methodsError,
    refetch,
  } = securityApi.useTwoFactorMethodsQuery();
  const [setupTotp, { loading: settingUpTotp, error: totpSetupError }] =
    securityApi.useSetupTotpMutation();
  const [
    setupEmail,
    { loading: settingUpEmail, error: emailSetupError },
  ] = securityApi.useSetupEmailTwoFactorMutation();
  const [enableTwoFactor, { loading: enabling, error: enableError }] =
    securityApi.useEnableTwoFactorMutation();
  const [disableTwoFactor, { loading: disabling, error: disableError }] =
    securityApi.useDisableTwoFactorMutation();

  const [setup, setSetup] = useState<SetupState | null>(null);
  const [startingSetupType, setStartingSetupType] =
    useState<TwoFactorType | null>(null);
  const [disablingType, setDisablingType] = useState<TwoFactorType | null>(
    null,
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);

  const methods = data?.twoFactorMethods ?? [];
  const isSettingUp = settingUpTotp || settingUpEmail;

  const methodName = (type: TwoFactorType) =>
    type === 'TOTP' ? t('authenticator') : t('email');

  const startSetup = async (type: TwoFactorType) => {
    setSetup(null);
    setStartingSetupType(type);
    setDisablingType(null);
    setNotice(null);
    setOperationError(null);

    try {
      if (type === 'TOTP') {
        const { data: setupData } = await setupTotp();
        if (setupData?.setupTotp) {
          setSetup({ type, qrCode: setupData.setupTotp.qrCode });
        } else {
          setOperationError(t('operationFailed'));
        }
        return;
      }

      const { data: setupData } = await setupEmail();
      if (setupData?.setupEmailTwoFactor) {
        setSetup({
          type,
          challengeToken: setupData.setupEmailTwoFactor.challengeToken,
        });
      } else {
        setOperationError(t('operationFailed'));
      }
    } catch (error) {
      setOperationError(
        error instanceof Error ? error.message : t('operationFailed'),
      );
    } finally {
      setStartingSetupType(null);
    }
  };

  const finishSetup = async (code: string) => {
    if (!setup) {
      return;
    }
    setOperationError(null);

    const input: TwoFactorInput = {
      type: setup.type,
      code,
      ...(setup.type === 'EMAIL' && { challengeToken: setup.challengeToken }),
    };

    try {
      const { data: enabled } = await enableTwoFactor({ variables: { input } });
      if (!enabled?.enableTwoFactor) {
        setOperationError(t('enableError'));
        return;
      }

      setSetup(null);
      setOperationError(null);
      setNotice(t('enabledSuccess', { method: methodName(setup.type) }));
      await refetch();
    } catch {
      return;
    }
  };

  const finishDisable = async (code: string) => {
    if (!disablingType) {
      return;
    }
    setOperationError(null);

    const type = disablingType;

    try {
      const { data: disabled } = await disableTwoFactor({
        variables: { input: { type, code } },
      });
      if (!disabled?.disableTwoFactor) {
        setOperationError(t('disableError'));
        return;
      }

      setDisablingType(null);
      setOperationError(null);
      setNotice(t('disabledSuccess', { method: methodName(type) }));
      await refetch();
    } catch {
      return;
    }
  };

  const cancelSetup = () => {
    setSetup(null);
    setOperationError(null);
  };

  const openDisableDialog = (type: TwoFactorType) => {
    setSetup(null);
    setOperationError(null);
    setDisablingType(type);
  };

  const closeDisableDialog = () => {
    if (!disabling) {
      setDisablingType(null);
      setOperationError(null);
    }
  };

  const getMethod = (type: TwoFactorType): TwoFactorMethod | undefined =>
    methods.find((method) => method.type === type);

  const setupError = (setup?.type === 'TOTP'
    ? totpSetupError
    : setup?.type === 'EMAIL'
      ? emailSetupError
      : undefined
  )?.message;
  const mutationError = setup
    ? enableError?.message
    : disablingType
      ? disableError?.message
      : undefined;
  const currentError = operationError ?? mutationError;

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 960, mx: 'auto' }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant='h4' component='h1' gutterBottom>
            {t('title')}
          </Typography>
          <Typography color='text.secondary'>{t('description')}</Typography>
        </Box>

        {notice && (
          <Alert severity='success' onClose={() => setNotice(null)}>
            {notice}
          </Alert>
        )}
        {setupError && <Alert severity='error'>{setupError}</Alert>}
        {operationError && !setup && !disablingType && (
          <Alert severity='error'>{operationError}</Alert>
        )}

        {methodsLoading ? (
          <Stack
            direction='row'
            spacing={1}
            sx={{ alignItems: 'center' }}
          >
            <CircularProgress size={20} />
            <Typography>{t('loading')}</Typography>
          </Stack>
        ) : methodsError ? (
          <Alert
            severity='error'
            action={
              <Button color='inherit' size='small' onClick={() => void refetch()}>
                {t('retry')}
              </Button>
            }
          >
            {t('loadError')} {methodsError.message}
          </Alert>
        ) : (
          <Stack spacing={2}>
            {(['TOTP', 'EMAIL'] as const).map((type) => {
              const method = getMethod(type);
              const enabled = !!method?.isEnabled;
              const name = methodName(type);
              const description =
                type === 'TOTP'
                  ? t('authenticatorDescription')
                  : t('emailDescription');
              const activeSetup = setup?.type === type;

              return (
                <Card key={type} variant='outlined'>
                  <CardContent>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2}
                      sx={{
                        alignItems: { xs: 'stretch', sm: 'center' },
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        <Typography variant='h6' component='h2'>
                          {name}
                        </Typography>
                        <Typography color='text.secondary'>
                          {description}
                        </Typography>
                        <Typography variant='body2' sx={{ mt: 1 }}>
                          {enabled ? t('enabled') : t('disabled')}
                          {enabled &&
                            ` · ${method?.isVerified ? t('verified') : t('notVerified')}`}
                        </Typography>
                      </Box>

                      {enabled ? (
                        <Button
                          variant='outlined'
                          color='error'
                          onClick={() => openDisableDialog(type)}
                        >
                          {t('disable')}
                        </Button>
                      ) : (
                        <Button
                          variant='contained'
                          onClick={() => void startSetup(type)}
                          disabled={isSettingUp || !!setup}
                        >
                          {isSettingUp && startingSetupType === type ? (
                            <CircularProgress size={20} />
                          ) : type === 'TOTP' ? (
                            t('setUpAuthenticator')
                          ) : (
                            t('setUpEmail')
                          )}
                        </Button>
                      )}
                    </Stack>

                    {activeSetup && (
                      <Box sx={{ mt: 3, maxWidth: 420 }}>
                        {setup.type === 'TOTP' ? (
                          <Stack spacing={2}>
                            <Typography>{t('scanQrCode')}</Typography>
                            <Box
                              component='img'
                              src={setup.qrCode}
                              alt={t('authenticator')}
                              sx={{
                                width: 200,
                                height: 200,
                                objectFit: 'contain',
                                alignSelf: 'flex-start',
                              }}
                            />
                          </Stack>
                        ) : (
                          <Typography sx={{ mb: 2 }}>
                            {t('emailCodePrompt')}
                          </Typography>
                        )}
                        <CodeForm
                          submitLabel={t('confirmAndEnable')}
                          loading={enabling}
                          onSubmit={finishSetup}
                          onCancel={cancelSetup}
                          cancelLabel={t('cancel')}
                          error={currentError}
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        )}
      </Stack>

      <Dialog open={!!disablingType} onClose={closeDisableDialog} fullWidth>
        <DialogTitle>
          {disablingType &&
            t('disableTitle', { method: methodName(disablingType) })}
        </DialogTitle>
        <DialogContent>
          <Typography color='text.secondary' sx={{ mb: 2 }}>
            {t('disableDescription')}
          </Typography>
          <CodeForm
            submitLabel={t('confirmDisable')}
            loading={disabling}
            onSubmit={finishDisable}
            onCancel={closeDisableDialog}
            cancelLabel={t('cancel')}
            error={currentError}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
