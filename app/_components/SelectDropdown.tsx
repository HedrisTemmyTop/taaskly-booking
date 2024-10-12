"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CountryInterface } from "../_types/country";
import { useAuthContext } from "../_hooks/AuthFormContext";
import filterCountries from "../_utils/filterCountry";

interface PropTyes {
  countries: CountryInterface[];
}

export default function SelectDropdown({ countries }: PropTyes) {
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<
    CountryInterface[]
  >([]);

  const { setSelectedCountry, setShowCountries } = useAuthContext();
  const sortedCountries = countries.sort((a, b) => {
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
    return 0;
  });

  return (
    <div className="absolute border-1 border border-primary-400 bg-secondary-400 p-4  w-full sm:w-[80%] rounded mt-16 z-10">
      <input
        type="search"
        className="border-b-1 bg-transparent border-b text-sm border-grey-400 outline-0 w-[100%]"
        placeholder="Search country"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setFilteredCountries(filterCountries(countries, e.target.value));
        }}
      />
      <ul className="h-[300px] overflow-y-auto no-scrollbar mt-4">
        {!query &&
          sortedCountries.map((country) => (
            <li
              className="flex justify-between  items-center mb-4 cursor-pointer"
              key={`${country.name.common}${country.name.official} `}
              onClick={() => {
                setSelectedCountry(country);
                setShowCountries(false);
              }}
            >
              <span className="flex items-center">
                <Image
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  width={20}
                  height={20}
                />
                <span className="ml-4">{country.name.common}</span>
              </span>
              <span>
                {" "}
                {country.idd.root}
                {country.idd?.suffixes?.[0] && country.idd.suffixes[0]}
              </span>
            </li>
          ))}
        {query && filteredCountries.length === 0 && (
          <div>Country not found</div>
        )}
        {query &&
          filteredCountries.length > 0 &&
          filteredCountries.map((country) => (
            <li
              className="flex justify-between items-center mb-4 cursor-pointer"
              key={`${country.name.common}${country.name.official} `}
              onClick={() => {
                setSelectedCountry(country);
                setShowCountries(false);
              }}
            >
              <span className="flex items-center">
                <Image
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  width={20}
                  height={20}
                />
                <span className="ml-4">{country.name.common}</span>
              </span>
              <span>
                {country.idd?.root}
                {country.idd?.suffixes?.[0] && country.idd.suffixes[0]}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
