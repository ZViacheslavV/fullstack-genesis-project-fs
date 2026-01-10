'use client';

import { childGender, User } from '@/types/user';
import css from './ProfileEditForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profileValidationSchema } from './ProfileValidationSchema';
import { updateMe } from '@/lib/api/clientApi';


interface ProfileEditFormProps {
  user: User;
}

interface FormValues {
  name: string;
  email: string;
  gender: childGender;
  dueDate: string;
}

function ProfileEditForm({ user }: ProfileEditFormProps) {
  const initialValues: FormValues = {
    name: user.name,
    email: user.email,
    gender: user.gender ?? 'unknown',
    dueDate: user.dueDate ?? '',
  };

  const handleSubmit = async (values: FormValues) => {
    const payload = {
      name: values.name,
      email: values.email,
      gender: values.gender,
      dueDate: values.dueDate,
    };

    try {
      await updateMe(payload);
    } catch (error) {
      console.error(error);
    }

    console.log('sent', payload);
  };

  return (
    <div className={css.picker}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}  enableReinitialize validationSchema={profileValidationSchema}>
        {({ resetForm }) => (
          <Form>
            <label htmlFor="name">
              Імя
              <Field id="name" name="name" type="text" />
              <ErrorMessage name="name" component="div" />
            </label>

            <label htmlFor="email">
              Пошта
              <Field id="email" name="email" type="email" />
                <ErrorMessage name="email" component="div" />
            </label>
            <label htmlFor="gender">
              Стать дитини
            <Field as="select" name="gender">
              
                <option value="unknown">Ще не знаю</option>
                <option value="boy">Хлопчик</option>
               <option value="girl">Дівчинка</option>
              </Field>
              </label>

            <label htmlFor="dueDate">
              Дата пологів
              <Field id="dueDate" name="dueDate" type="date" />
              <ErrorMessage name="dueDate" component="div" />
            </label>

            <button
              type="button"
              onClick={() => resetForm()}
            >
              Відмінити зміни
            </button>

            <button type="submit">
             Зберегти зміни
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileEditForm;
