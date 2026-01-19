'use client';

import Button from '@/components/common/Button/Button';
import Toast from '@/components/common/Toast/Toast';
import { API_ENDPOINTS, nextServer } from '@/lib/api/api';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import css from '../RegistrationForm/RegistrationForm.module.css';

const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email('Некоректна пошта').required('Введіть email'),
});

type ForgotPasswordValues = {
  email: string;
};

export default function ForgotPassword() {
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const initialValues: ForgotPasswordValues = { email: '' };

  const handleSubmit = async (
    values: ForgotPasswordValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordValues>
  ) => {
    try {
      await nextServer.post(API_ENDPOINTS.REQUEST_RESET_PASSWORD, values);

      setToast({
        type: 'success',
        message: 'Якщо такий email існує — лист надіслано!',
      });
    } catch {
      setToast({
        type: 'error',
        message: 'Помилка надсилання листа',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ForgotPasswordSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form} noValidate>
          <h1 className={css.title}>Скидання паролю</h1>

          <div className={css.fieldGroup}>
            <Field
              className={`${css.field} ${
                touched.email && errors.email ? css.fieldInvalid : ''
              } ${touched.email && !errors.email ? css.fieldValid : ''}`}
              type="email"
              name="email"
              placeholder="Пошта"
              autoComplete="email"
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Надсилаємо…' : 'Надіслати лист'}
          </Button>

          {toast && <Toast type={toast.type} message={toast.message} />}
        </Form>
      )}
    </Formik>
  );
}
