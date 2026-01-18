import { childGender } from '@/types/user';
import * as Yup from 'yup';

const today = new Date();
const minDate = new Date(today);
minDate.setDate(today.getDate() + 7);

const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 40 * 7);

export const profileValidationSchema = Yup.object({
  name: Yup.string()
    .max(32, '*Ім`я не може містити більше 32 символів')
    .required('*Поле має бути заповненим'),

  email: Yup.string()
    .email('*Недійсний формат електронної пошти')
    .max(64, '*Довжина пошти не має перевищувати 64 символи')
    .required('*Поле має бути заповненим'),

gender: Yup.mixed<childGender>() 
    .oneOf(['unknown', 'girl', 'boy'])
    .required(),

  dueDate: Yup.string()
    .required('*Поле має бути заповненим')
    .test(
      'valid-format',
      '*Дата пологів має бути у форматі рік-MM-DD ',
      value => !!value && /^\d{4}-\d{2}-\d{2}$/.test(value)
    )
    .test(
      'min-date',
      '*Дата пологів має бути щонайменше за тиждень',
      value => value ? new Date(value) >= minDate : false
    )
    .test(
      'max-date',
      '*Час до пологів не може перевищувати 40 тижнів',
      value => value ? new Date(value) <= maxDate : false
    ),
});
