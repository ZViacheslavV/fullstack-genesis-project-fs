'use client';
import { Formik, Form, Field } from 'formik';
import { useEffect, useId } from 'react';
import css from './OnboardingForm.module.css';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { UpdateUserData, User } from '@/types/user';
import { loginUser, updateCurrentUser } from '@/lib/api/clientApi';
import Select from 'react-select';
import { selectStyles, genderOptions } from './OnboardingContent';
import { useRouter } from 'next/navigation';
import { useAuthUserStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';
//===========================================================================

interface Props {
  initialData?: User | null;
}

interface FormValues {
  gender?: '' | 'boy' | 'girl' | 'unknown';
  dueDate?: string;
}

function OnboardingForm({ initialData }: Props) {
  const initialValues: FormValues = {
    gender: initialData?.gender ?? '',
    dueDate: initialData?.dueDate ?? '',
  };

  const fieldId = useId();
  const router = useRouter();
 const user = useAuthUserStore((state) => state.user);
const setUser = useAuthUserStore((state) => state.setUser);

  const handleSubmit = async (values: FormValues) => {
    try {
        const payload: any = {};

      if (values.gender !== '') {
        payload.gender = values.gender;
      }

      if (values.dueDate !== '') {
        payload.dueDate = values.dueDate;
      }

      const updatedUser = await updateCurrentUser(payload);

      setUser(updatedUser);
      toast.success('Профіль збережено');

      router.push('/');
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Помилка збереження'
      );
    }
  };

  return (
    <div className={css.picker}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.fieldGroup}>
            <label htmlFor={`${fieldId}-selectGender`}>Стать дитини</label>
            <Field name="gender">
              {({ field, form }: any) => (
                <Select
                  instanceId={`${fieldId}-gender`}
                  options={genderOptions}
                  placeholder="Оберіть стать"
                  isSearchable={false}
                  className={css.selectContainer}
                  classNamePrefix="react-select"
                  styles={selectStyles}
                  value={genderOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(option: any) =>
                    form.setFieldValue(field.name, option.value)
                  }
                />
              )}
            </Field>
          </div>
          <div className={css.fieldGroup}>
            <label htmlFor={`${fieldId}-dueDate`}>Планова дата пологів</label>
            <Field
              id={`${fieldId}-dueDate`}
              name="dueDate"
              component={CalendarDatePicker}
              placeholderText="Оберіть дату"
              className={css.dateInput}
            />
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
