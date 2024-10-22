import CreateBookingForm from "@/app/_components/CreateBookingForm";
import { getUserAvailabilities } from "@/app/_lib/availability";
export const metadata = {
  title: "Booking types",
  description: "Create Booking Types",
};
export default async function Page() {
  const data = await getUserAvailabilities();
  const formattedData = data.map((av) => ({
    name: av.name,
    id: av._id,
  }));
  console.log(formattedData);
  return (
    <form className="flex justify-between flex-col md:flex-row gap-4 items-start pb-16 md:pb-0 ">
      <CreateBookingForm availabilites={formattedData} />
    </form>
  );
}
