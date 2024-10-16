"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface BookingTypeContextType {
  name: string;
  availability: string;
  description: string;
  duration: number | null;
  price: number | null;
  isPublic: "Yes" | "No";
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAvailability: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDuration: React.Dispatch<React.SetStateAction<number | null>>;
  setPrice: React.Dispatch<React.SetStateAction<number | null>>;
  setPublic: React.Dispatch<React.SetStateAction<"Yes" | "No">>;
}

const BookingTypeContext = createContext<BookingTypeContextType | undefined>(
  undefined
);

export const BookingTypeProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState<null | number>(null);
  const [price, setPrice] = useState<null | number>(null);
  const [isPublic, setPublic] = useState<"Yes" | "No">("Yes");
  return (
    <BookingTypeContext.Provider
      value={{
        name,
        setName,
        description,
        isPublic,
        setPublic,
        price,
        setPrice,
        setDescription,
        duration,
        setDuration,
        availability,
        setAvailability,
      }}
    >
      {children}
    </BookingTypeContext.Provider>
  );
};

export const useBookingTypeContext = () => {
  const context = useContext(BookingTypeContext);
  if (!context)
    throw new Error(
      "useBookingTypeContext must be used within BookingTypeProvider"
    );
  return context;
};
