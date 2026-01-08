'use client';
import { FieldProps } from 'formik';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarDatePickerProps extends FieldProps {
  onDateSelect?: (dateStr: string) => void;
  placeholderText?: string;
  className?: string;
  disabled?: boolean; //кастомні пропси, щоб використовувати можливості react date picker, за потреби можна розширити
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  form,
  field,
  onDateSelect,
  ...props
}) => {
  const dateValue = field.value ? new Date(field.value) : null; //формуємо початкове значення

  const handleChange = (date: Date | null) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd'); //готуємо дату в форматі рядочка для валідації Formik+Yup
      form.setFieldValue(field.name, dateString); //так ми зв'язуємо і передаємо дані react date picker в Formik
      if (onDateSelect) {
        onDateSelect(dateString); //не обов'язковий проп, я його використовую, щоб зберігти draft завдання юзера в zustand
      }
    } else {
      form.setFieldValue(field.name, '');
    }
  };

  return (
    <DatePicker
      {...props}
      id={field.name}
      dateFormat="yyyy-MM-dd"
      selected={dateValue}
      onChange={handleChange}
      minDate={new Date()}
    />
  );
};

export default CalendarDatePicker;

//приклад використання з Formik:

{
  /* <Field
      id={`${fieldId}-date`}
      name="date"
      component={CalendarDatePicker}
      onDateChange={handleDateChange}
      className="date-picker"
      wrapperClassName="date-picker-wrapper"
    /> */
}
