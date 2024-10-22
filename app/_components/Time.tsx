import React from "react";
import timeSlots from "../_lib/timeSlot";

export default function Time({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  return (
    <ul className="absolute w-[100%] shadow-lg rounded-sm z-10 top-[110%] bg-secondary-400 py-2 px-4 flex flex-col max-h-[240px] overflow-auto">
      {timeSlots.map((time) => (
        <li
          key={time}
          className="h-9 text-start flex-shrink-0"
          onClick={() => onSelect(time)}
        >
          {time}
        </li>
      ))}
    </ul>
  );
}
