'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { loginSchema, registerSchema } from '../../schemas';
import { authApi } from '../../api';
import { CURRENT_USER } from '@/modules/user/api/queries';
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
  const { t } = useTranslation('auth');

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

  const [mutate, { error, loading }] = config.mutation();

  const onSubmit = async (values: AuthFormValues) => {
    if (loading) {
      return;
    }

    const input =
      mode === 'register'
        ? {
            email: values.email,
            password: values.password,
            role: values.role,
          }
        : {
            email: values.email,
            password: values.password,
          };

    try {
      await mutate({
        variables: {
          input,
        },
        refetchQueries: [{ query: CURRENT_USER }],
        awaitRefetchQueries: true,
      });

      router.replace('/drugs');
    } catch {
      return;
    }
  };

  return (
    <AuthCard>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ErrorContainer role='alert'>{error?.message ?? ''}</ErrorContainer>

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
