// "use client";
// // import { createUser } from "../api/users/route";
// import { useEffect, useState } from "react";
// import AuthInput from "./AuthInput";
// import SelectDropdown from "./SelectDropdown";

// export default function AuthForm({ page }: { page: string }) {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     const fetchCountries = async function () {
//       const response = await fetch("https://restcountries.com/v3.1/all");
//       const data = await response.json();
//       console.log(data);
//       setCountries(data);
//     };
//     fetchCountries();
//   }, []);
//   if (countries.length > 0)
//     return (
//       <AuthInput page={page}>
//         <SelectDropdown countries={countries} />
//       </AuthInput>
//     );
// }

// import { createUser } from "../api/users/route";
import AuthInput from "./AuthInput";
import SelectDropdown from "./SelectDropdown";

export default async function AuthForm({ page }: { page: string }) {
  // const [countries, setCountries] = useState([]);
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  return (
    <AuthInput page={page}>
      <SelectDropdown countries={countries} />
    </AuthInput>
  );
}
