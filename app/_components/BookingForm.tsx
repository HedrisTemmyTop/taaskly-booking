"use client";

import { ReactNode, useState } from "react";
import PhoneNumberInput from "./PhoneNumberInput";
import ReusableInput from "./ReusableInput";

export default function BookingForm({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
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
        onChange={(e) => setName(e.target.value)}
        value={""}
      />
      <PhoneNumberInput>{children}</PhoneNumberInput>
      <ReusableInput
        label={"Additional Notes"}
        name="notes"
        placeholder="Add instruction for the vendor name"
        inputType={"textarea"}
        onChange={(e) => setName(e.target.value)}
        value={""}
      />
    </>
  );
}
