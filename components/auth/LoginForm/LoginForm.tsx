'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { loginRequest, loginUser } from '@/lib/api/clientApi';
import { useAuthUserStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';

import Toast from '@/components/common/Toast/Toast';
import Button from '@/components/common/Button/Button';
import css from '../RegistrationForm/RegistrationForm.module.css';

//===============================================================

const initialValues: loginRequest = {
  email: '',
  password: '',
};

//===============================================================

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .max(64, 'Пошта занадто довга')
    .email('Недійсний формат електронної пошти')
    .required('Поле має бути заповненим'),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .max(128, 'Пароль занадто довгий')
    .required('Поле має бути заповненим'),
});

//===============================================================

function LoginForm() {
  const fieldId = useId();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const setUser = useAuthUserStore((s) => s.setUser);

  const handleSubmit = async (
    values: loginRequest,
    actions: FormikHelpers<loginRequest>
  ) => {
    try {
      const res = await loginUser(values);

      setUser(res.data as User);
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);

      toast.custom(
        <Toast type="error" message="Пошта або пароль введені невірно." />,
        { duration: 5000 }
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginFormSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
      validateOnMount
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form} noValidate>
          <h1 className={css.title}>Вхід</h1>

          {/* Email */}
          <div className={css.fieldGroup}>
            <Field
              className={`${css.field} ${
                touched.email && errors.email ? css.fieldInvalid : ''
              } ${touched.email && !errors.email ? css.fieldValid : ''}`}
              type="email"
              name="email"
              id={`${fieldId}-email`}
              placeholder="Пошта"
              autoComplete="email"
              inputMode="email"
            />

            <div className={css.errorSlot} aria-live="polite">
              <ErrorMessage name="email">
                {(msg) => <p className={css.errorText}>{msg}</p>}
              </ErrorMessage>
              {!(touched.email && errors.email) && (
                <p className={css.errorTextHidden} aria-hidden="true">
                  hidden text;
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className={css.fieldGroup}>
            <div className={css.passwordWrapper}>
              <Field
                className={`${css.field} ${
                  touched.password && errors.password ? css.fieldInvalid : ''
                } ${touched.password && !errors.password ? css.fieldValid : ''}`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                id={`${fieldId}-password`}
                placeholder="••••••••"
                autoComplete="new-password"
              />

              <button
                type="button"
                className={css.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className={css.passwordIcon} />
                ) : (
                  <Eye className={css.passwordIcon} />
                )}
              </button>
            </div>

            <div className={css.errorSlot} aria-live="polite">
              <ErrorMessage name="password">
                {(msg) => <p className={css.errorText}>{msg}</p>}
              </ErrorMessage>
              {!(touched.password && errors.password) && (
                <p className={css.errorTextHidden} aria-hidden="true">
                  hidden text;
                </p>
              )}
            </div>
          </div>

          <Button
            variant="normal"
            size="md"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Входимо…' : 'Увійти'}
          </Button>

          <p className={css.helper}>
            Немає аккаунту?
            <Link className={css.link} href="/auth/register">
              Зареєструватися
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
