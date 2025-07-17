"use client";

import { isBefore, startOfDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css"; // Import default styles

function MyDatePicker({ selected, setSelected, disabledDays }) {
  const isPastDay = (day) => {
    try {
      return isBefore(startOfDay(day), startOfDay(new Date())); // Disable days before today
    } catch (error) {
      console.error("Error checking if day is past:", error);
      return false;
    }
  };

  const handleSelect = (date) => {
    try {
      // Prevent setting the same date multiple times to avoid crashes
      if (date && selected && date.getTime() === selected.getTime()) {
        console.log("Same date selected, ignoring");
        return;
      }
      setSelected(date);
    } catch (error) {
      console.error("Error in date selection:", error);
    }
  };

  const isDisabled = (currDay) => {
    try {
      return disabledDays.includes(currDay.getDay()) || isPastDay(currDay);
    } catch (error) {
      console.error("Error checking if day is disabled:", error);
      return false;
    }
  };

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onDayClick={handleSelect}
      defaultMonth={new Date()}
      disabled={isDisabled}
      formatters={{
        formatWeekdayName: (day: Date) => {
          try {
            const options: Intl.DateTimeFormatOptions = { weekday: "short" }; // Correctly set to 'short'
            return new Intl.DateTimeFormat("en-US", options)
              .format(day)
              .toUpperCase();
          } catch (error) {
            console.error("Error formatting weekday name:", error);
            return "DAY";
          }
        },
      }}
      className="text-primary-400 py-4 px-2 vsm:p-4 text-sm"
    />
  );
}

export default MyDatePicker;
