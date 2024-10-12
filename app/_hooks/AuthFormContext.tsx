"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { CountryInterface } from "../_types/country";

interface AuthContextType {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setShowCountries: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCountry: React.Dispatch<React.SetStateAction<CountryInterface>>;
  showCountries: boolean;
  selectedCountry: CountryInterface;
}
const initialState = {
  name: {
    common: "Nigeria",
    official: "Federal Republic of Nigeria",
  },
  flags: {
    svg: "https://flagcdn.com/ng.svg", // SVG URL for Nigeria's flag
  },
  idd: {
    root: "+2",
    suffixes: ["34"], // International dialing code for Nigeria
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<string>("email");
  const [selectedCountry, setSelectedCountry] =
    useState<CountryInterface>(initialState);
  const [showCountries, setShowCountries] = useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{
        state,
        setState,
        showCountries,
        setShowCountries,
        selectedCountry,
        setSelectedCountry,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
