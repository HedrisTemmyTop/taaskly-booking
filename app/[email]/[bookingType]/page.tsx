import BookForm from "@/app/_components/DayPicker/BookForm";
import SelectDropdown from "@/app/_components/SelectDropdown";

export default async function Page() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  return (
    <div className="bg-[#f4f7fa] w-full min-h-[100vh] text-primary-400 flex items-center">
      <BookForm>
        <SelectDropdown countries={countries} />
      </BookForm>
    </div>
  );
}
