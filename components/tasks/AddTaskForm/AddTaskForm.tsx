'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';

import css from './AddTaskForm.module.css';
import { useId } from 'react';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { TaskFormData } from '@/types/task';
import { createTask } from '@/lib/api/userApi';

//===========================================================================
const today = new Date();
today.setHours(0, 0, 0, 0);

interface TaskFormValues {
  name: string;
  date: Date;
}

const initialValues: TaskFormValues = {
  name: '',
  date: today,
};

const TaskFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Завдання має містити хоча б 1 символ')
    .max(96, 'Завдання надто довге')
    .required('Введіть текст завдання'),
  date: Yup.date().min(today, 'Дата не може бути в минулому'),
});

function AddTaskForm() {
  const fieldId = useId();

  const queryClient = useQueryClient();

  // const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (TaskFormData: TaskFormData) => await createTask(TaskFormData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['task'],
      });
      // toast('Successfully submitted!');
      // setErrors({});
      // clearDraft();
      // router.push('/');
    },
    onError: () => console.log('error mutation'),
    // toast('Sorry, something went wrong, please try again'),
  });

  const handleSubmit = (values: TaskFormValues, actions: FormikHelpers<TaskFormValues>) => {
    const payload = {
      name: values.name,
      // date: format(values.date, 'yyyy-MM-dd'),
      date: values.date,
    };

    console.log('Order data (Formatted):', payload);
    console.log('Order data:', values);

    mutate(payload);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={TaskFormSchema}>
      <Form>
        <fieldset>
          <legend>Нове завдання</legend>

          <label htmlFor={`${fieldId}-name`}>Назва завдання</label>
          <Field type="text" name="name" id={`${fieldId}-name`} placeholder="Введіть назву..." />
          <ErrorMessage name="name" component="span" />

          <label htmlFor={`${fieldId}-date`}>Дата</label>
          <Field id={`${fieldId}-date`} name="date" component={CalendarDatePicker} />
        </fieldset>
        <button type="submit">Зберегти</button>
      </Form>
    </Formik>
  );
}

export default AddTaskForm;
