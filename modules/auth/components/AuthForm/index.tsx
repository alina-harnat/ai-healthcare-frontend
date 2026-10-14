'use client';

import { useState } from 'react';
import { CombinedGraphQLErrors } from '@apollo/client';
import { useApolloClient } from '@apollo/client/react';
import { useRouter } from '@/core/localization/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import SecurityOutlined from '@mui/icons-material/SecurityOutlined';

import {
  loginSchema,
  registerSchema,
  twoFactorCodeSchema,
} from '../../schemas';
import { authApi } from '../../api';
import { CURRENT_USER } from '@/modules/user/api/queries';
import type { TwoFactorType } from '../../api/types';
import {
  AuthCard,
  Form,
  FieldGroup,
  Label,
  StyledTextField,
  SubmitButton,
  Switch,
  SwitchLink,
  ErrorContainer,
} from './auth-form-styles';
import { AuthRoutes } from '../../enums';
import { Role } from '@/modules/common/enums/role';

type AuthMode = 'login' | 'register';

type AuthFormValues = {
  email: string;
  password: string;
  role?: Role;
};

type Props = {
  mode: AuthMode;
};

type LoginChallenge = {
  token: string;
  methods: TwoFactorType[];
};

function normalizeTwoFactorType(method: string): TwoFactorType | null {
  switch (method.toLowerCase()) {
    case 'totp':
      return 'TOTP';
    case 'email':
      return 'EMAIL';
    default:
      return null;
  }
}

const authConfig = {
  login: {
    schema: loginSchema,
    mutation: authApi.useLoginMutation,
    switchPath: AuthRoutes.Register,
  },
  register: {
    schema: registerSchema,
    mutation: authApi.useRegisterMutation,
    switchPath: AuthRoutes.Login,
  },
} as const;

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const t = useTranslations('auth');
  const client = useApolloClient();
  const [challenge, setChallenge] = useState<LoginChallenge | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<TwoFactorType | null>(
    null,
  );
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [challengeError, setChallengeError] = useState('');
  const [credentialError, setCredentialError] = useState('');
  const [emailNotice, setEmailNotice] = useState('');

  const config = authConfig[mode];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(config.schema),
    defaultValues: {
      email: '',
      password: '',
      ...(mode === 'register' && {
        role: Role.User,
      }),
    },
  });

  const [login, { loading: loginLoading, error: loginError }] =
    authApi.useLoginMutation();
  const [registerAccount, { loading: registerLoading, error: registerError }] =
    authApi.useRegisterMutation();
  const [requestEmailCode, { loading: requestingEmailCode }] =
    authApi.useRequestLoginEmailCodeMutation();
  const [verifyTwoFactor, { loading: verifyingTwoFactor }] =
    authApi.useVerifyLoginTwoFactorMutation();
  const {
    control: codeControl,
    handleSubmit: handleCodeSubmit,
    reset: resetCode,
    formState: { errors: codeErrors },
  } = useForm<{ code: string }>({
    resolver: zodResolver(twoFactorCodeSchema),
    defaultValues: { code: '' },
  });

  const loading = mode === 'login' ? loginLoading : registerLoading;

  const completeLogin = async () => {
    await client.refetchQueries({ include: [CURRENT_USER] });
    router.replace('/drugs');
  };

  const errorMessage = (error: unknown) => {
    const messages = CombinedGraphQLErrors.is(error)
      ? error.errors.map(({ message }) => message.toLowerCase())
      : [];

    if (messages.some((message) => message.includes('invalid credentials'))) {
      return { message: t('twoFactor.invalidCredentials'), recover: false };
    }
    if (
      messages.some((message) =>
        message.includes('too many failed login attempts'),
      )
    ) {
      return { message: t('twoFactor.rateLimited'), recover: false };
    }
    if (
      messages.some((message) => message.includes('invalid verification code'))
    ) {
      return { message: t('twoFactor.invalidCode'), recover: false };
    }
    if (
      messages.some((message) =>
        message.includes('request an email verification code first'),
      )
    ) {
      return { message: t('twoFactor.requestCodeFirst'), recover: false };
    }
    if (
      messages.some((message) =>
        message.includes('login challenge not found or expired'),
      )
    ) {
      return { message: t('twoFactor.challengeExpired'), recover: true };
    }
    if (
      messages.some((message) =>
        message.includes('selected two-factor method is no longer enabled'),
      )
    ) {
      return { message: t('twoFactor.methodUnavailable'), recover: true };
    }
    if (
      messages.some((message) =>
        message.includes('too many verification attempts'),
      )
    ) {
      return { message: t('twoFactor.attemptsExceeded'), recover: true };
    }

    return { message: t('twoFactor.genericError'), recover: false };
  };

  const resetChallenge = () => {
    setChallenge(null);
    setSelectedMethod(null);
    setEmailCodeSent(false);
    setChallengeError('');
    setEmailNotice('');
    resetCode({ code: '' });
  };

  const onSubmit = async (values: AuthFormValues) => {
    if (loading) {
      return;
    }

    try {
      setCredentialError('');
      if (mode === 'register') {
        await registerAccount({
          variables: {
            input: {
              email: values.email,
              password: values.password,
              role: values.role,
            },
          },
          refetchQueries: [{ query: CURRENT_USER }],
          awaitRefetchQueries: true,
        });
        router.replace('/drugs');
        return;
      }

      const result = await login({
        variables: {
          input: { email: values.email, password: values.password },
        },
      });
      const loginResult = result.data?.login;

      if (loginResult?.requiresTwoFactor) {
        const methods = Array.from(
          new Set(
            (loginResult.availableMethods ?? [])
              .map(normalizeTwoFactorType)
              .filter((method): method is TwoFactorType => method !== null),
          ),
        );

        if (!loginResult.loginChallengeToken || methods.length === 0) {
          setCredentialError(t('twoFactor.genericError'));
          return;
        }

        setChallenge({
          token: loginResult.loginChallengeToken,
          methods,
        });
        setSelectedMethod(methods[0]);
        setChallengeError('');
        setEmailNotice('');
        resetCode({ code: '' });
        return;
      }

      if (loginResult?.authenticated) {
        await completeLogin();
        return;
      }

      setCredentialError(t('twoFactor.genericError'));
    } catch (error) {
      setCredentialError(errorMessage(error).message);
    }
  };

  const handleMethodChange = (
    _: React.MouseEvent<HTMLElement>,
    method: TwoFactorType | null,
  ) => {
    if (!method || !challenge?.methods.includes(method)) {
      return;
    }

    setSelectedMethod(method);
    setEmailCodeSent(false);
    setChallengeError('');
    setEmailNotice('');
    resetCode({ code: '' });
  };

  const handleRequestEmailCode = async () => {
    if (!challenge || selectedMethod !== 'EMAIL' || requestingEmailCode) {
      return;
    }

    setChallengeError('');
    setEmailNotice('');
    try {
      const result = await requestEmailCode({
        variables: { input: { loginChallengeToken: challenge.token } },
      });
      if (result.data?.requestLoginEmailCode) {
        setEmailCodeSent(true);
        setEmailNotice(t('twoFactor.sendCodeSuccess'));
      } else {
        setChallengeError(t('twoFactor.genericError'));
      }
    } catch (error) {
      const normalized = errorMessage(error);
      if (normalized.recover) {
        resetChallenge();
        setCredentialError(normalized.message);
      } else {
        setChallengeError(normalized.message);
      }
    }
  };

  const onVerifyCode = async ({ code }: { code: string }) => {
    if (!challenge || !selectedMethod || verifyingTwoFactor) {
      return;
    }

    setChallengeError('');
    try {
      const result = await verifyTwoFactor({
        variables: {
          input: {
            loginChallengeToken: challenge.token,
            type: selectedMethod,
            code,
          },
        },
      });
      if (result.data?.verifyLoginTwoFactor) {
        resetChallenge();
        await completeLogin();
        return;
      }

      setChallengeError(t('twoFactor.genericError'));
    } catch (error) {
      const normalized = errorMessage(error);
      if (normalized.recover) {
        resetChallenge();
        setCredentialError(normalized.message);
      } else {
        setChallengeError(normalized.message);
      }
    }
  };

  if (challenge && selectedMethod) {
    return (
      <AuthCard>
        <Form
          onSubmit={handleCodeSubmit(onVerifyCode)}
          aria-busy={verifyingTwoFactor}
        >
          <div>
            <Typography variant='h6' component='h1'>
              {t('twoFactor.title')}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              {t('twoFactor.description')}
            </Typography>
          </div>

          <ToggleButtonGroup
            fullWidth
            exclusive
            value={selectedMethod}
            onChange={handleMethodChange}
            aria-label={t('twoFactor.description')}
          >
            {challenge.methods.map((method) => (
              <ToggleButton key={method} value={method} sx={{ gap: 1 }}>
                {method === 'TOTP' ? (
                  <>
                    <SecurityOutlined fontSize='small' />
                    {t('twoFactor.totp')}
                  </>
                ) : (
                  <>
                    <EmailOutlined fontSize='small' />
                    {t('twoFactor.email')}
                  </>
                )}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <ErrorContainer role='alert' aria-live='assertive'>
            {challengeError}
          </ErrorContainer>

          {selectedMethod === 'EMAIL' && !emailCodeSent && (
            <SubmitButton
              type='button'
              variant='contained'
              loading={requestingEmailCode}
              disabled={requestingEmailCode}
              onClick={handleRequestEmailCode}
            >
              {t('twoFactor.sendCode')}
            </SubmitButton>
          )}

          {selectedMethod === 'EMAIL' && emailCodeSent && (
            <Typography
              color='text.secondary'
              variant='body2'
              role='status'
              aria-live='polite'
            >
              {emailNotice}
            </Typography>
          )}

          {(selectedMethod === 'TOTP' || emailCodeSent) && (
            <>
              <FieldGroup>
                <Label htmlFor='two-factor-code'>{t('twoFactor.code')}</Label>
                <Controller
                  name='code'
                  control={codeControl}
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      id='two-factor-code'
                      type='text'
                      size='small'
                      autoFocus
                      autoComplete='one-time-code'
                      error={!!codeErrors.code}
                      helperText={
                        codeErrors.code
                          ? t('validation.twoFactorCode')
                          : undefined
                      }
                      slotProps={{
                        htmlInput: {
                          inputMode: 'numeric',
                          maxLength: 6,
                          pattern: '[0-9]{6}',
                        },
                      }}
                      onChange={(event) => {
                        field.onChange(
                          event.target.value.replace(/\D/g, '').slice(0, 6),
                        );
                      }}
                    />
                  )}
                />
              </FieldGroup>

              <SubmitButton
                type='submit'
                variant='contained'
                loading={verifyingTwoFactor}
                disabled={verifyingTwoFactor}
              >
                {t('twoFactor.verify')}
              </SubmitButton>
            </>
          )}

          <Button
            type='button'
            onClick={() => {
              resetChallenge();
              setCredentialError('');
            }}
          >
            {t('twoFactor.back')}
          </Button>
        </Form>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ErrorContainer role='alert' aria-live='assertive'>
          {credentialError ||
            (mode === 'register'
              ? registerError?.message
              : loginError?.message) ||
            ''}
        </ErrorContainer>

        <FieldGroup>
          <Label htmlFor='email'>{t(`${mode}.email`)}</Label>

          <StyledTextField
            id='email'
            type='email'
            size='small'
            error={!!errors.email}
            helperText={errors.email ? t('validation.email') : undefined}
            {...register('email')}
          />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor='password'>{t(`${mode}.password`)}</Label>

          <StyledTextField
            id='password'
            type='password'
            size='small'
            error={!!errors.password}
            helperText={errors.password ? t('validation.password') : undefined}
            {...register('password')}
          />
        </FieldGroup>

        {mode === 'register' && (
          <FieldGroup>
            <Label>{t('register.role')}</Label>

            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <FormControl>
                  <RadioGroup row {...field} value={field.value ?? Role.User}>
                    <FormControlLabel
                      value={Role.User}
                      control={<Radio />}
                      label={t('register.userRole')}
                    />

                    <FormControlLabel
                      value={Role.Admin}
                      control={<Radio />}
                      label={t('register.adminRole')}
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </FieldGroup>
        )}

        <SubmitButton
          type='submit'
          variant='contained'
          loading={loading}
          disabled={loading}
        >
          {t(`${mode}.submit`)}
        </SubmitButton>
      </Form>

      <Switch>
        {t(`${mode}.switch`)}{' '}
        <SwitchLink href={config.switchPath}>
          {t(`${mode}.switchAction`)}
        </SwitchLink>
      </Switch>
    </AuthCard>
  );
}
