'use client';

import { useState, useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

import css from './ChangePassword.module.css';
import Toast from '@/components/common/Toast/Toast';
import { changePassword } from '@/lib/api/clientApi';

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ToastState = {
  type: 'success' | 'error';
  message: string;
} | null;

export default function ChangePasswordPage() {
  const router = useRouter();
  const fieldId = useId();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const initialValues: FormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Введіть поточний пароль'),
    newPassword: Yup.string()
      .min(8, 'Мінімум 8 символів')
      .required('Введіть новий пароль'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Паролі не співпадають')
      .required('Підтвердіть пароль'),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      setToast({
        type: 'success',
        message: 'Пароль успішно змінено',
      });

      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch {
      setToast({
        type: 'error',
        message: 'Не вдалося змінити пароль',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <h1 className={css.title}>Зміна паролю</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={css.form}>
            <label htmlFor={`${fieldId}-current`} className={css.label}>
              Поточний пароль
              <div className={css.passwordWrapper}>
                <Field
                  id={`${fieldId}-current`}
                  name="currentPassword"
                  type={showCurrent ? 'text' : 'password'}
                  className={css.input}
                />
                <button
                  type="button"
                  className={css.eye}
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <ErrorMessage
                name="currentPassword"
                component="p"
                className={css.error}
              />
            </label>

            <label htmlFor={`${fieldId}-new`} className={css.label}>
              Новий пароль
              <div className={css.passwordWrapper}>
                <Field
                  id={`${fieldId}-new`}
                  name="newPassword"
                  type={showNew ? 'text' : 'password'}
                  className={css.input}
                />
                <button
                  type="button"
                  className={css.eye}
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <ErrorMessage
                name="newPassword"
                component="p"
                className={css.error}
              />
            </label>

            <label htmlFor={`${fieldId}-confirm`} className={css.label}>
              Підтвердіть новий пароль
              <div className={css.passwordWrapper}>
                <Field
                  id={`${fieldId}-confirm`}
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  className={css.input}
                />
                <button
                  type="button"
                  className={css.eye}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className={css.error}
              />
            </label>

            <button type="submit" className={css.submit} disabled={loading}>
              {loading ? 'Збереження...' : 'Змінити пароль'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
