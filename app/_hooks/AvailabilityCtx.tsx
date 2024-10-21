"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Day } from "../_types/IAvailability";

interface AvailabilityTypeCtx {
  name: string;
  id: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  sunday: Day;
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  setSunday: React.Dispatch<React.SetStateAction<Day>>;
  setMonday: React.Dispatch<React.SetStateAction<Day>>;
  setTuesday: React.Dispatch<React.SetStateAction<Day>>;
  setWednesday: React.Dispatch<React.SetStateAction<Day>>;
  setThursday: React.Dispatch<React.SetStateAction<Day>>;
  setFriday: React.Dispatch<React.SetStateAction<Day>>;
  setSaturday: React.Dispatch<React.SetStateAction<Day>>;
  reset: () => void;
}

export const AvailabilityCtx = createContext<AvailabilityTypeCtx | undefined>(
  undefined
);

const initialDaysState: Day[] = [
  { isActive: false, time: [{ id: 0, from: "8:00am", to: "5:00am" }] },
  { isActive: true, time: [{ id: 1, from: "8:00am", to: "5:00am" }] },
  { isActive: true, time: [{ id: 2, from: "8:00am", to: "5:00am" }] },
  { isActive: true, time: [{ id: 3, from: "8:00am", to: "5:00am" }] },
  { isActive: true, time: [{ id: 4, from: "8:00am", to: "5:00am" }] },
  { isActive: true, time: [{ id: 5, from: "8:00am", to: "5:00am" }] },
  { isActive: false, time: [{ id: 6, from: "8:00am", to: "5:00am" }] },
];

export const AvailabilityProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("Working Hours");
  const [id, setId] = useState("");
  const [days, setDays] = useState<Day[]>(initialDaysState);

  // General setter function for days
  const setDay = (
    dayIndex: number,
    updatedDay: Day | ((prevDay: Day) => Day)
  ) => {
    setDays((prevDays) => {
      const newDays = [...prevDays];
      newDays[dayIndex] =
        typeof updatedDay === "function"
          ? updatedDay(prevDays[dayIndex])
          : updatedDay;
      return newDays;
    });
  };
  const reset = () => {
    setDays(initialDaysState);
    setName("Working Hours");
  };

  return (
    <AvailabilityCtx.Provider
      value={{
        name,
        id,
        setName,
        setId,
        sunday: days[0],
        monday: days[1],
        tuesday: days[2],
        wednesday: days[3],
        thursday: days[4],
        friday: days[5],
        saturday: days[6],
        reset,
        setSunday: (day: Day | ((prevDay: Day) => Day)) => setDay(0, day),
        setMonday: (day: Day | ((prevDay: Day) => Day)) => setDay(1, day),
        setTuesday: (day: Day | ((prevDay: Day) => Day)) => setDay(2, day),
        setWednesday: (day: Day | ((prevDay: Day) => Day)) => setDay(3, day),
        setThursday: (day: Day | ((prevDay: Day) => Day)) => setDay(4, day),
        setFriday: (day: Day | ((prevDay: Day) => Day)) => setDay(5, day),
        setSaturday: (day: Day | ((prevDay: Day) => Day)) => setDay(6, day),
      }}
    >
      {children}
    </AvailabilityCtx.Provider>
  );
};

export const useAvailabilityCtx = function () {
  const context = useContext(AvailabilityCtx);
  if (!context)
    throw new Error(
      "useAvailabilityContext must be used within AvailabilityProvider"
    );
  return context;
};
