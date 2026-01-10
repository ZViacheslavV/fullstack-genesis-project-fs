import { childGender } from '@/types/user';
import * as Yup from 'yup';

const today = new Date();
const minDate = new Date(today);
minDate.setDate(today.getDate() + 7);

const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 40 * 7);

export const profileValidationSchema = Yup.object({
  name: Yup.string()
    .max(32, 'Name must be at most 32 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .max(64, 'Email must be at most 64 characters')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters')
    .required('Password is required'),

gender: Yup.mixed<childGender>()
    .oneOf(['unknown', 'girl', 'boy'])
    .required(),

  dueDate: Yup.string()
    .required('Due date is required')
    .test(
      'valid-format',
      'Date must be in YYYY-MM-DD format',
      value => !!value && /^\d{4}-\d{2}-\d{2}$/.test(value)
    )
    .test(
      'min-date',
      'Due date must be at least 1 week from today',
      value => value ? new Date(value) >= minDate : false
    )
    .test(
      'max-date',
      'Due date must be within 40 weeks from today',
      value => value ? new Date(value) <= maxDate : false
    ),
});
