"use client";
import { Dispatch, SetStateAction } from "react";
// import { createUser } from "../api/users/route";
import AuthInput from "./AuthInput";
import SelectDropdown from "./SelectDropdown";
import { CountryInterface } from "../_types/country";

export default function AuthForm({
  page,
  isLoading,
  setAuthMethod,
  countries,
}: {
  page: string;
  isLoading: boolean;
  setAuthMethod: Dispatch<SetStateAction<string>>;
  countries: CountryInterface[];
}) {
  if (countries.length > 0)
    return (
      <AuthInput setAuthMethod={setAuthMethod} page={page} loading={isLoading}>
        <SelectDropdown countries={countries} />
      </AuthInput>
    );
}

// import { createUser } from "../api/users/route";
// import AuthInput from "./AuthInput";
// import SelectDropdown from "./SelectDropdown";

// export default  function AuthForm({ page }: { page: string }) {
//   // const [countries, setCountries] = useState([]);
//   const response = await fetch("https://restcountries.com/v3.1/all");
//   const countries = await response.json();

//   return (
//     <AuthInput page={page}>
//       <SelectDropdown countries={countries} />
//     </AuthInput>
//   );
// }
