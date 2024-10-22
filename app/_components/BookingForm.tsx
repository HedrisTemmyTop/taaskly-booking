"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import PhoneNumberInput from "./PhoneNumberInput";
import ReusableInput from "./ReusableInput";

interface IBookingForm {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phoneNumber: number | null;
  setPhoneNumber: Dispatch<SetStateAction<number | null>>;
  notes: string;
  setNotes: (val: string) => void;
  children: ReactNode;
}

export default function BookingForm({
  children,
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  notes,
  setNotes,
}: IBookingForm) {
  return (
    <>
      <ReusableInput
        label={"Name"}
        name="name"
        placeholder="Enter your fullname"
        inputType={"input"}
        type={"text"}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <ReusableInput
        label={"Email Address"}
        name="email"
        placeholder="Enter your email address"
        inputType={"input"}
        type={"email"}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <PhoneNumberInput
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      >
        {children}
      </PhoneNumberInput>
      <ReusableInput
        label={"Additional Notes"}
        name="notes"
        placeholder="Add instruction for the vendor name"
        inputType={"textarea"}
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      />
    </>
  );
}
