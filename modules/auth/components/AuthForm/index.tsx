'use client';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { loginSchema, registerSchema } from '../../schemas';
import { authApi } from '../../api';
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

type AuthMode = 'login' | 'register';

type AuthFormValues = {
  email: string;
  password: string;
};

type Props = {
  mode: AuthMode;
};

const authConfig = {
  login: {
    schema: loginSchema,
    mutation: authApi.useLoginMutation,
    switchPath: '/register',
  },
  register: {
    schema: registerSchema,
    mutation: authApi.useRegisterMutation,
    switchPath: '/login',
  },
} as const;

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const { t } = useTranslation('auth');

  const config = authConfig[mode];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(config.schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [mutate, { data, error, loading }] = config.mutation();

  const onSubmit = async (values: AuthFormValues) => {
    await mutate({
      variables: {
        input: values,
      },
    });

    router.replace('/');
  };

  useEffect(() => {
    if (data) {
      router.replace('/');
    }
  }, [data, router]);

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

        <SubmitButton type='submit' variant='contained' disabled={loading}>
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
