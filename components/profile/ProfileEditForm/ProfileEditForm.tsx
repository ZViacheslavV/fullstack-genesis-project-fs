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
import Toast from '@/components/common/Toast/Toast';
import Modal from '@/components/common/Modal/Modal';

interface ProfileEditFormProps {
  user: User;
}

interface FormValues {
  name: string;
  email: string;
  gender: childGender | null;
  dueDate: string;
}

type ToastState = {
  message: string;
  type: 'success' | 'error';
} | null;

function ProfileEditForm({ user }: ProfileEditFormProps) {
  const router = useRouter();
  const fieldId = useId();

  const [isDateFocused, setIsDateFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

    try {  setLoading(true);
      await updateMe(payload);
      router.refresh();
      setToast({
      message: 'Дані успішно збережено',
      type: 'success',
    });
    } catch (error) {
      console.error(error);
        setToast({
      message: 'Не вдалося зберегти зміни',
      type: 'error',
    });
    }
    finally {
      setLoading(false);
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
        {({ resetForm, errors, touched, dirty, submitForm, isValid }) => (
          <>
          <Form>
             {toast && (
  <Toast message={toast.message} type={toast.type} />
)}
            <div className={css.inputFields}>

              <label htmlFor={`${fieldId}-name`}  className={css.label}>
                Ім`я
                <Field
                  id={`${fieldId}-name`}
                  name="name"
                  type="text"
                   className={`${css.field} ${
    touched.name && errors.name ? css.fieldError : ''
  }`}
                />
                <ErrorMessage name="name" component="p" className={css.error}/>
              </label>


              <label htmlFor={`${fieldId}-email`} className={css.label}>
                Пошта
                <Field
                  id={`${fieldId}-email`}
                  name="email"
                  type="email"
                   className={`${css.field} ${
    touched.email && errors.email ? css.fieldError : ''
  }`}
                />
                <ErrorMessage name="email" component="p" className={css.error} />
              </label>

              <label htmlFor={`${fieldId}-gender`} className={css.label}>
                Стать дитини
                <Field name="gender" id={`${fieldId}-gender`}>
                  {({ field, form }: FieldProps<FormValues['gender']>) => (
                    <GenderSelect
                      value={field.value}
                      onChange={(value) =>
                        form.setFieldValue(field.name, value)
                      }
                    />
                  )}
                </Field>
                <ErrorMessage name="gender" component="p" className={css.error}/>
              </label>

              <label className={`${css.label} ${css.dateLabel}`}  htmlFor={`${fieldId}-dueDate`}>
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

                <ErrorMessage name="dueDate" component="p" className={css.error}/>
              </label>


              <div className={css.buttonContainer}>
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className={css.undoChanges}
                >
                  {'Відмінити зміни'}
                </button>

                <button type="button" onClick={() => setIsConfirmOpen(true)}  disabled={!dirty || !isValid || loading} className={css.saveChanges}>
                  
                  {loading ? 'Завантаження...' : 'Зберегти зміни'}
                </button>
              </div>
            </div>
            </Form>
             <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        closeOnBackdrop={!loading}
              closeOnEsc={!loading}
              modalClassName={css.modalSize}
      >
        <div className={css.modalPosition}>
        <p className={css.modalText}>
          Ви впевнені, що хочете зберегти внесені зміни?
        </p>

        <div className={css.modalActions}>
          <button
            type="button"
            className={css.undoChanges}
            onClick={() => setIsConfirmOpen(false)}
            disabled={loading}
          >
            Скасувати
          </button>

          <button
            type="button"
            className={css.saveChanges}
            disabled={loading}
            onClick={async () => {
            
              await submitForm();
                setIsConfirmOpen(false);
            }}
          >
            Підтвердити
          </button>
                </div>
                </div>
      </Modal>
          </>
        )}
        
      </Formik>
    </div>
  );
}

export default ProfileEditForm;
