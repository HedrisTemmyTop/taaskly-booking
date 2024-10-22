import CreateBookingForm from "@/app/_components/CreateBookingForm";
import { getUserAvailabilities } from "@/app/_lib/availability";
import { getBookingType, getBookingTypes } from "@/app/_lib/bookingType";
import { notFound } from "next/navigation";
export const metadata = {
  title: "Booking types",

};
export async function generateStaticParams() {
  const bookingTypes = await getBookingTypes();
  const bookingTypesIds = bookingTypes.map((type) => ({
    bookingTypesId: String(type.slug),
  }));
  return bookingTypesIds;
}

export default async function Page({
  params,
}: {
  params: { bookingTypesId: string };
}) {
  const data = await getUserAvailabilities();
  const formattedData = data.map((av) => ({
    name: av.name,
    id: av._id,
  }));
  const bookingType = await getBookingType(params.bookingTypesId);
  if (!bookingType) {
    notFound();
  }
  return (
    <form className="flex justify-between flex-col md:flex-row gap-4 items-start pb-16 md:pb-0 ">
      <CreateBookingForm data={bookingType} availabilites={formattedData} />
    </form>
  );
}
