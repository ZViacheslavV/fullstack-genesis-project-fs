'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';

import css from '../RegistrationForm/RegistrationForm.module.css';

//===============================================================

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
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

  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    console.log('Login data:', values);
    actions.resetForm();
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
            <Field
              className={`${css.field} ${
                touched.password && errors.password ? css.fieldInvalid : ''
              } ${touched.password && !errors.password ? css.fieldValid : ''}`}
              type="password"
              name="password"
              id={`${fieldId}-password`}
              placeholder="Пароль"
              autoComplete="new-password"
            />

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

          <button className={css.btn} type="submit" disabled={isSubmitting}>
            Увійти
          </button>

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
