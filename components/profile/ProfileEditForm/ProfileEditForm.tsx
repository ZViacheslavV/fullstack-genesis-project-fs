'use client';

import { useState, useId } from 'react';
import { childGender, User } from '@/types/user';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { profileValidationSchema } from './ProfileValidationSchema';
import { updateMe, UpdateProfile } from '@/lib/api/clientApi';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import GenderSelect from '@/components/common/Select/Select';
import { useRouter } from 'next/navigation';

import css from './ProfileEditForm.module.css';

interface ProfileEditFormProps {
  user: User;
}

interface FormValues {
  name: string;
  email: string;
  gender: childGender | null;
  dueDate: string;
}

function ProfileEditForm({ user }: ProfileEditFormProps) {
  const router = useRouter();
  const fieldId = useId();

  // 🔥 состояние ТОЛЬКО для иконки
  const [isDateFocused, setIsDateFocused] = useState(false);

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

    if (values.gender !== null) payload.gender = values.gender;
    if (values.dueDate) payload.dueDate = values.dueDate;

    try {
      await updateMe(payload);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css.fullLowerContent}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={profileValidationSchema}
      >
        {({ resetForm }) => (
          <Form>
            <div className={css.inputFields}>
              {/* ІМʼЯ */}
              <label htmlFor="name" className={css.label}>
                Ім`я
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className={css.field}
                />
                <ErrorMessage name="name" component="p" />
              </label>

              {/* EMAIL */}
              <label htmlFor="email" className={css.label}>
                Пошта
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={css.field}
                />
                <ErrorMessage name="email" component="p" />
              </label>

              {/* GENDER */}
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
                <ErrorMessage name="gender" component="p" />
              </label>

              {/* DATE */}
              <label className={`${css.label} ${css.dateLabel}`}>
                Планова дата пологів

                <div className={css.dateWrapper}>
                  <Field
                    id={`${fieldId}-dueDate`}
                    name="dueDate"
                    component={CalendarDatePicker}
                    placeholderText="Оберіть дату"
                    className={css.dateInput}
                    autoComplete="off"
                    onFocus={() => setIsDateFocused(true)}   
                    onBlur={() => setIsDateFocused(false)}  
                  />

                  <span
                    className={`${css.dateIcon} ${
                      isDateFocused ? css.dateIconOpen : ''
                    }`}
                  />
                </div>

                <ErrorMessage name="dueDate" component="p" />
              </label>

              {/* BUTTONS */}
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
