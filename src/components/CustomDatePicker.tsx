import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { enUS } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useCalendar } from '../context/CalendarContext';
import dayjs, { Dayjs } from 'dayjs';

registerLocale('en-US', enUS);

const CustomDatePicker: React.FC = () => {
  const { setCurrentDate } = useCalendar();

  const [date, setDate] = useState<Date | null>(null);

  const handleChange = (selected: Date | null) => {
    setDate(selected);
    if (selected) {
      const d: Dayjs = dayjs(selected);
      setCurrentDate(d);
    }
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      locale="en-US"
      placeholderText="Select a date"
      dateFormat="MMMM d, yyyy"
      inline
      popperPlacement="bottom-start"
      todayButton="Today"
      className="google-style-datepicker"
    />
  );
};

export default CustomDatePicker;
