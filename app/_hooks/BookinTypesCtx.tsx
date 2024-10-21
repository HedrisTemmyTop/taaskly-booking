"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface BookingTypeContextType {
  name: string;
  availability: { name: string; id: string };
  id: string;
  description: string;
  duration: number | null;
  price: number | null;
  isPublic: "Yes" | "No";
  setName: React.Dispatch<React.SetStateAction<string>>;
  reset: () => void;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setAvailability: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
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
  const [availability, setAvailability] = useState({
    name: "",
    id: "",
  });
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState<null | number>(null);
  const [price, setPrice] = useState<null | number>(null);
  const [isPublic, setPublic] = useState<"Yes" | "No">("Yes");
  const [id, setId] = useState("");
  const reset = function () {
    setName("");
    setDescription("");
    setPublic("Yes");
    setAvailability({
      name: "",
      id: "",
    });
    setPrice(null);
    setDuration(null);
    setId("");
  };
  return (
    <BookingTypeContext.Provider
      value={{
        name,
        setName,
        description,
        id,
        setId,
        isPublic,
        setPublic,
        price,
        reset,
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
