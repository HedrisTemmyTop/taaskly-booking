import AuthInput from "./AuthInput";
import SelectDropdown from "./SelectDropdown";

export default async function AuthForm() {
  const response = await fetch("https://restcountries.com/v3.1/all");
const countries = await response.json()

  return (
    <form className="form mt-1.5 w-[100%]">
      <AuthInput>
        <SelectDropdown countries={countries} />
      </AuthInput>
    </form>
  );
}
