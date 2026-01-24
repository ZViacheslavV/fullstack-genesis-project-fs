'use client';

import Button from '@/components/common/Button/Button';
import Toast from '@/components/common/Toast/Toast';
import { API_ENDPOINTS, nextServer } from '@/lib/api/api';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FormikHelpers } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import css from '../RegistrationForm/RegistrationForm.module.css';

const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .required('Введіть пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Паролі не співпадають')
    .required('Повторіть пароль'),
});

type ResetPasswordValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  if (!token) {
    return <p>Некоректне посилання</p>;
  }

  const initialValues: ResetPasswordValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (
    values: ResetPasswordValues,
    { setSubmitting }: FormikHelpers<ResetPasswordValues>
  ) => {
    try {
      await nextServer.post(API_ENDPOINTS.RESET_PASSWORD, {
        token,
        password: values.password,
      });

      setToast({
        type: 'success',
        message: 'Пароль змінено, увійдіть з новим паролем',
      });

      setTimeout(() => router.push('/auth/login'), 1500);
    } catch {
      setToast({
        type: 'error',
        message: 'Посилання недійсне або застаріле',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ResetPasswordSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form} noValidate>
          <h1 className={css.title}>Встановити новий пароль</h1>

          <div className={css.fieldGroup}>
            <Field
              className={`${css.field} ${
                touched.password && errors.password ? css.fieldInvalid : ''
              } ${touched.password && !errors.password ? css.fieldValid : ''}`}
              type="password"
              name="password"
              placeholder="Новий пароль"
              autoComplete="new-password"
            />

            <div className={css.errorSlot}>
              <ErrorMessage name="password">
                {(msg) => <p className={css.errorText}>{msg}</p>}
              </ErrorMessage>
              {!(touched.password && errors.password) && (
                <p className={css.errorTextHidden}>hidden text;</p>
              )}
            </div>
          </div>

          <div className={css.fieldGroup}>
            <Field
              className={`${css.field} ${
                touched.confirmPassword && errors.confirmPassword
                  ? css.fieldInvalid
                  : ''
              } ${
                touched.confirmPassword && !errors.confirmPassword
                  ? css.fieldValid
                  : ''
              }`}
              type="password"
              name="confirmPassword"
              placeholder="Повторіть пароль"
              autoComplete="new-password"
            />

            <div className={css.errorSlot}>
              <ErrorMessage name="confirmPassword">
                {(msg) => <p className={css.errorText}>{msg}</p>}
              </ErrorMessage>
              {!(touched.confirmPassword && errors.confirmPassword) && (
                <p className={css.errorTextHidden}>hidden text;</p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Зберігаємо…' : 'Змінити пароль'}
          </Button>

          {toast && <Toast type={toast.type} message={toast.message} />}
        </Form>
      )}
    </Formik>
  );
}
