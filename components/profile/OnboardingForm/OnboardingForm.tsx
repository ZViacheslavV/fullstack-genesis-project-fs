'use client';

import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import css from './OnboardingForm.module.css';

import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { updateCurrentUser, UpdateProfile } from '@/lib/api/clientApi';
import { useAuthUserStore } from '@/lib/store/authStore';
import { User } from '@/types/user';


import { FaChevronDown } from 'react-icons/fa';
import GenderSelect from '@/components/common/Select/Select';
import { FieldProps } from 'formik';

// ===============================

interface Props {
  initialData?: User | null;
}

interface FormValues {
  gender: 'boy' | 'girl' | 'unknown' | null;
  dueDate: string;
}

function OnboardingForm({ initialData }: Props) {
const initialValues: FormValues = {
  gender: null,
  dueDate: initialData?.dueDate ?? '',
};

  const fieldId = useId();
  const router = useRouter();
  const setUser = useAuthUserStore((state) => state.setUser);

  const handleSubmit = async (values: FormValues) => {
    try {
      const payload: UpdateProfile = {};

      if (values.gender !== null) {
        payload.gender = values.gender;
      }

      if (values.dueDate) {
        payload.dueDate = values.dueDate;
      }

      const updatedUser = await updateCurrentUser(payload);

      setUser(updatedUser);
      toast.success('Профіль збережено');
      router.push('/');
    } catch {
      toast.error('Помилка збереження');
    }
  };

  return (
    <div className={css.picker}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          {/* GENDER */}
          <div className={css.fieldGroup}>
            <div className={css.datePickerWrapper}>
              <div className={css.fieldGroup}>
                <label>Стать дитини</label>

                <div className={css.selectWrapper}>
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
                  </div>
              </div>
            </div>
         

          {/* DATE */}
          
            <label htmlFor={`${fieldId}-dueDate`}>Планова дата пологів</label>

            <div className={css.datePickerWrapper}>
              <Field
                id={`${fieldId}-dueDate`}
                name="dueDate"
                component={CalendarDatePicker}
                placeholderText="Оберіть дату"
                className={css.dateInput}
                autoComplete="off"
              />

              <span className={css.dateIcon}>
                <FaChevronDown size={14} />
              </span>
            </div>
          </div>

          <button type="submit" className={css.saveButton}>
            Зберегти
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default OnboardingForm;