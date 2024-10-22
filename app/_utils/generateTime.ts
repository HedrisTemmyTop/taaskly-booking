import {
  addMinutes,
  format,
  isAfter,
  isBefore,
  isToday,
  parse
} from "date-fns";

function parseTime(time: string): Date {
  let parsedTime;

  parsedTime = parse(time, "h:mma", new Date());
  if (!isNaN(parsedTime.getTime())) {
    return parsedTime;
  }

  // If the above fails, try parsing as 24-hour format
  parsedTime = parse(time, "HH:mm", new Date());
  if (!isNaN(parsedTime.getTime())) {
    return parsedTime;
  }

  throw new Error(`Invalid time string: ${time}`);
}

export function generateTimeSlots(
  ranges: { id?: number; from: string; to: string }[],
  formatType: "12h" | "24h",
  date: Date
): string[] {
  const slots: string[] = [];
  const now = new Date();
  const isToday = checkIfToday(date);
  console.log(`Generating ${formatType} slots for ranges:`, ranges);

  ranges.forEach((range) => {
    let start = parseTime(range.from);
    const end = parseTime(range.to);

    if (isAfter(start, end)) {
      console.warn(`Invalid time range: ${range.from} to ${range.to}`);
      return; // Skip invalid ranges
    }

    const timeFormat = formatType === "12h" ? "h:mma" : "HH:mm";

    while (
      isBefore(start, end) ||
      format(start, timeFormat) === format(end, timeFormat)
    ) {
      if (!isToday || isAfter(start, now)) {
        slots.push(format(start, timeFormat)); // Add formatted time
      }
      start = addMinutes(start, 15);
    }
  });

  return slots;
}

export function convertTo12HourFormat(time24: string): string {
  const parsedTime = parse(time24, "HH:mm", new Date());

  if (isNaN(parsedTime.getTime())) {
    throw new Error(`Invalid 24-hour time string: ${time24}`);
  }

  return format(parsedTime, "h:mma").toLowerCase(); // something like "1:00pm"
}

const checkIfToday = function (date: Date): boolean {
  console.log(date);

  return isToday(date);
};
export function addDuration(time, minutes) {
  const [timePart, modifier] = time.split(/(AM|PM)/);
  const [hours, minutesPart] = timePart.split(":");

  // Create a date object
  const date = new Date();
  date.setHours(
    parseInt(hours) + (modifier === "PM" && parseInt(hours) !== 12 ? 12 : 0)
  );
  date.setMinutes(parseInt(minutesPart) + minutes);

  // Format the new time
  const newHours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const newMinutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero if needed
  const newModifier = date.getHours() < 12 ? "AM" : "PM";

  return `${newHours}:${newMinutes}${newModifier}`;
}

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
