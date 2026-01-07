'use client';
import { FieldProps } from 'formik';
// import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const CalendarDatePicker: React.FC<FieldProps> = ({ form, field }) => {
  // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleChange = (date: Date | null) => {
    // setSelectedDate(date);
    form.setFieldValue(field.name, date);
  };

  return (
    <DatePicker
      id={field.name}
      dateFormat="yyyy-MM-dd"
      selected={field.value}
      onChange={handleChange}
      minDate={today}
    />
  );
};

export default CalendarDatePicker;
