"use client";

import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { useAuthContext } from "../_hooks/AuthFormContext";
import { FaChevronDown } from "react-icons/fa6";

export default function PhoneNumberInput({
  children,
}: {
  children: ReactNode;
}) {
  const { showCountries, setShowCountries, selectedCountry } = useAuthContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="flex flex-col w-[100%] mb-4 relative">
      <label htmlFor="email" className="ml-1 mb-1 font-medium">
        Phone number
      </label>

      <div className="relative">
        <span
          className="absolute left-4 top-1/2 cursor-pointer transform -translate-y-1/2 z-10 flex items-center  border-r-2 border-grey-200 pr-2"
          onClick={() => setShowCountries((prev) => !prev)}
        >
          <Image
            src={selectedCountry.flags.svg}
            alt={`${selectedCountry.name.common} flag`}
            width={20}
            height={20}
          />
          <span className="mx-2">
            {" "}
            {selectedCountry.idd?.root}
            {selectedCountry.idd?.suffixes?.[0] &&
              selectedCountry.idd.suffixes[0]}
          </span>
          <FaChevronDown
            className={`text-sm transform  duration-500 ${
              showCountries ? "rotate-180 transition-transform " : ""
            }`}
          />
        </span>
        {showCountries && <span> {children}</span>}
        <input
          type="number"
          name="phoneNumber"
          className="border-2 outline-0 py-1 pl-32 border-primary-400
              rounded-lg text-inherit w-[100%] h-12"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
    </div>
  );
}
