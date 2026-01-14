'use client';

import { childGender, User } from '@/types/user';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { profileValidationSchema } from './ProfileValidationSchema';
import { updateMe, UpdateProfile } from '@/lib/api/clientApi';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';

// --

import css from './ProfileEditForm.module.css';
import GenderSelect from '@/components/common/Select/Select';
import { useId } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
// --

interface ProfileEditFormProps {
  user: User;
}

// interface FormValues {
//   name: string;
//   email: string;
//   gender: childGender;
//   dueDate: string;
// }

interface FormValues {
  name: string;
  email: string;
  gender: childGender | null;
  dueDate: string;
}

function ProfileEditForm({ user }: ProfileEditFormProps) {

    const router = useRouter();
  const fieldId = useId();

  const initialValues: FormValues = {
    name: user.name,
    email: user.email,
    gender: user.gender ?? null,
    dueDate: user.dueDate ?? '',
  };
  const handleSubmit = async (values: FormValues) => {
    const payload: UpdateProfile = {
      name: values.name,
      email: values.email,
    };

    if (values.gender !== null) {
      payload.gender = values.gender;
    }

    if (values.dueDate) {
      payload.dueDate = values.dueDate;
    }

    try {
      await updateMe(payload);
      console.log('sent', payload);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <Formik
        className=""
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={profileValidationSchema}
      >
        {({ resetForm }) => (
          <Form>
            <div className={css.inputFields}>
              <label htmlFor="name" className={css.label}>
                Ім`я
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className={css.field}
                />
                <ErrorMessage name="name">
                  {(msg) => <p className="">{msg}</p>}
                </ErrorMessage>
              </label>

              <label htmlFor="email" className={css.label}>
                Пошта
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={css.field}
                />
                <ErrorMessage name="email">
                  {(msg) => <p className="">{msg}</p>}
                </ErrorMessage>
              </label>

              <label htmlFor="gender" className={css.label}>
                Стать дитини
                <Field name="gender">
                  {({ field, form }: FieldProps<FormValues['gender']>) => (
                    <GenderSelect
                      value={field.value}
                      onChange={(value) =>
                        form.setFieldValue(field.name, value)
                      }
                    />
                  )}
                </Field>
                <ErrorMessage name="gender">
                  {(msg) => <p className="">{msg}</p>}
                </ErrorMessage>
              </label>

              <label className={css.label}>
                Планова дата пологів
                <div className={css.dateWrapper}>
                  <Field
                    id={`${fieldId}-dueDate`}
                    name="dueDate"
                    component={CalendarDatePicker}
                    placeholderText="Оберіть дату"
                    className={css.dateInput}
                  />

                  <span className={css.dateIcon}>
                    <FaChevronDown size={14} />
                  </span>
                </div>
                <ErrorMessage name="dueDate">
                  {(msg) => <p>{msg}</p>}
                </ErrorMessage>
              </label>

              <div className={css.buttonContainer}>
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className={css.undoChanges}
                >
                  Відмінити зміни
                </button>

                <button type="submit" className={css.saveChanges}>
                  Зберегти зміни
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileEditForm;
