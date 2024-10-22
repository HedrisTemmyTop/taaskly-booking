import BookForm from "@/app/_components/DayPicker/BookForm";
import SelectDropdown from "@/app/_components/SelectDropdown";
import { getUserBookingWithAvailability } from "@/app/_lib/bookingType";
import { getUser } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

export const revalidate = 3000;
export default async function Page({
  params,
}: {
  params: {
    email: string;
    bookingType: string;
  };
}) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  const decodedEmail = decodeURIComponent(params.email); // Decode the email

  const owner = await getUser(decodedEmail);
  const booking = await getUserBookingWithAvailability(params.bookingType);
  if (!owner || !booking) notFound();

  return (
    <div className="bg-[#f4f7fa] w-full min-h-[100vh] text-primary-400 flex items-center">
      <BookForm
        booking={booking}
        ownersEmail={owner.email}
        ownersName={owner.name}
        ownersPhoneNumber={owner.phoneNumber ?? ""}
      >
        <SelectDropdown countries={countries} />
      </BookForm>
    </div>
  );
}
