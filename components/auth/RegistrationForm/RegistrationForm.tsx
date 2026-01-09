'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';

import css from './RegistrationForm.module.css';

//===============================================================

interface RegistrationFormValues {
  username: string;
  email: string;
  password: string;
}

const initialValues: RegistrationFormValues = {
  username: '',
  email: '',
  password: '',
};

//===============================================================

const RegistrationFormSchema = Yup.object().shape({
  username: Yup.string()
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

  const handleSubmit = (
    values: RegistrationFormValues,
    actions: FormikHelpers<RegistrationFormValues>
  ) => {
    console.log('Registration data:', values);
    actions.resetForm();
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
            <label className={css.label} htmlFor={`${fieldId}-username`}>
              Ім’я*
            </label>

            <Field
              className={`${css.field} ${
                touched.username && errors.username ? css.fieldInvalid : ''
              } ${touched.username && !errors.username ? css.fieldValid : ''}`}
              type="text"
              name="username"
              id={`${fieldId}-username`}
              placeholder="Ваше ім’я"
              autoComplete="name"
            />

            <div className={css.errorSlot} aria-live="polite">
              <ErrorMessage name="username">
                {(msg) => <p className={css.errorText}>{msg}</p>}
              </ErrorMessage>
              {!(touched.username && errors.username) && (
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

            <Field
              className={`${css.field} ${
                touched.password && errors.password ? css.fieldInvalid : ''
              } ${touched.password && !errors.password ? css.fieldValid : ''}`}
              type="password"
              name="password"
              id={`${fieldId}-password`}
              placeholder="••••••••"
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
            Зареєструватись
          </button>

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
