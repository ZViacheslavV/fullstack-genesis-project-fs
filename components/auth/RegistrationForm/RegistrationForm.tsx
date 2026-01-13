'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { registerUser, RegisterRequest } from '@/lib/api/clientApi';
import { useAuthUserStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';

import Toast from '@/components/common/Toast/Toast';
import Button from '@/components/common/Button/Button';
import css from './RegistrationForm.module.css';

//===============================================================

const initialValues: RegisterRequest = { name: '', email: '', password: '' };

//===============================================================

const RegistrationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Ім’я має містити щонайменше 2 символи')
    .max(32, 'Ім’я занадто довге')
    .required('Поле має бути заповненим'),
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

function RegistrationForm() {
  const fieldId = useId();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const setUser = useAuthUserStore((s) => s.setUser);

  const handleSubmit = async (
    values: RegisterRequest,
    actions: FormikHelpers<RegisterRequest>
  ) => {
    try {
      const res = await registerUser(values);
      setUser(res.data as User);

      toast.custom(
        <Toast
          type="success"
          message="Вітаємо з успішною реєстрацією у додатку для майбутніх мам!"
        />,
        { duration: 5000 }
      );

      router.push('/profile/edit');
    } catch (err) {
      console.error('Register error:', err);

      toast.custom(
        <Toast
          type="error"
          message="Не вдалося зареєструватися. Спробуйте ще раз."
        />,
        { duration: 5000 }
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationFormSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
      validateOnMount
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form} noValidate>
          <h1 className={css.title}>Реєстрація</h1>

          {/* Username */}
          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor={`${fieldId}-name`}>
              Ім’я*
            </label>

            <Field
              className={`${css.field} ${
                touched.name && errors.name ? css.fieldInvalid : ''
              } ${touched.name && !errors.name ? css.fieldValid : ''}`}
              type="text"
              name="name"
              id={`${fieldId}-name`}
              placeholder="Ваше ім’я"
              autoComplete="name"
            />

            <div className={css.errorSlot} aria-live="polite">
              <ErrorMessage name="name">
                {(msg) => <p className={css.errorText}>{msg}</p>}
              </ErrorMessage>
              {!(touched.name && errors.name) && (
                <p className={css.errorTextHidden} aria-hidden="true">
                  hidden text;
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className={css.fieldGroup}>
            <label className={css.label} htmlFor={`${fieldId}-email`}>
              Пошта*
            </label>

            <Field
              className={`${css.field} ${
                touched.email && errors.email ? css.fieldInvalid : ''
              } ${touched.email && !errors.email ? css.fieldValid : ''}`}
              type="email"
              name="email"
              id={`${fieldId}-email`}
              placeholder="hello@leleka.com"
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
            <label className={css.label} htmlFor={`${fieldId}-password`}>
              Пароль*
            </label>

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
            {isSubmitting ? 'Зачекайте…' : 'Зареєструватись'}
          </Button>

          <p className={css.helper}>
            Вже маєте акаунт?
            <Link className={css.link} href="/auth/login">
              Увійти
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default RegistrationForm;
