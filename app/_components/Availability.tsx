import React from "react";

export default function Availability({ availability, day }) {
  return (
    availability[day].isActive && (
      <div className="grid grid-cols-1 vsm:grid-cols-custom gap-x-0 mb-2 ">
        <span className="font-medium capitalize">{day}</span>
        <span className="flex gap-4 flex-wrap">
          {availability[day].time.map((time, i) => (
            <span className="uppercase flex gap-1" key={time.id}>
              {i !== 0 && <b className="mr-1">|</b>}
              <span>{time.from}</span>-<span>{time.to}</span>
            </span>
          ))}
        </span>
      </div>
    )
  );
}
