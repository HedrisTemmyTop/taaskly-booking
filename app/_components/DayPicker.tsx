"use client";

import { isBefore, startOfDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css"; // Import default styles

function MyDatePicker({ selected, setSelected, disabledDays }) {
  const isPastDay = (day) => {
    return isBefore(startOfDay(day), startOfDay(new Date())); // Disable days before today
  };
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={new Date()}
      disabled={(currDay) => {
        return disabledDays.includes(currDay.getDay()) || isPastDay(currDay);
      }}
      formatters={{
        formatWeekdayName: (day: Date) => {
          const options: Intl.DateTimeFormatOptions = { weekday: "short" }; // Correctly set to 'short'
          return new Intl.DateTimeFormat("en-US", options)
            .format(day)
            .toUpperCase();
        },
      }}
      className="text-primary-400 py-4 px-2 vsm:p-4 text-sm"
    />
  );
}

export default MyDatePicker;
