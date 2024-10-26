import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings } from "@/app/_lib/booking";
import { getUserById } from "@/app/_lib/data-service";
import { addDuration } from "@/app/_utils/generateTime";
import { addMinutes, format } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";

export const generateStaticParams = async function () {
  const bookings = await getBookings();
  const slug = bookings.map((booking) => ({
    slug: booking.slug,
  }));

  return slug;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const booking = await getBooking(params.slug);
  if (!booking) {
    notFound();
  }
  const owner = await getUserById(booking.bookingType.owner);
  const session = await auth();
  const nameParts = owner.name.split(" ");

  const firstName = nameParts[0] || "";
  const lastName = nameParts[nameParts.length - 1];

  const dateSelected = new Date(booking.bookedDate);
  const fromDate = format(dateSelected, "EEEE, MMMM do yyyy", {
    locale: enUS,
  });
  const dateSelectedPlusDuration = addMinutes(dateSelected, booking.duration);

  const toDate = format(dateSelectedPlusDuration, "EEEE, MMMM do yyyy", {
    locale: enUS,
  });
  const toTime = addDuration(booking.bookedTime, booking.duration);

  return (
    <main className="text-primary-400 py-20 bg-[#f4f7fa] relative  m-auto w-full min-h-[100vh] grid place-items-center">
      {session?.user && (
        <Link
          href="/dashboard/booking"
          className="absolute top-4 left-4 flex items-center gap-1"
        >
          <span>
            <IoIosArrowBack />
          </span>
          <span>Back to booking</span>
        </Link>
      )}
      <div className="grid grid-cols-1  border border-[#E5E6EB] p-8 bg-secondary-400 max-w-[600px]">
        <div className="flex gap-4 items-center border-b pb-8 border-b-[#E5E6EB] flex-col ">
          <span className="w-[60px] h-[60px] text-3xl bg-primary-400 rounded-full text-secondary-400 grid place-items-center">
            <IoCheckmarkSharp />
          </span>
          <h2 className="text-2xl font-medium text-center">
            This meeting has been scheduled
          </h2>
          <div className="text-base leading-2  text-center">
            We sent a whatsapp message and an email with a calendar invitation
            with the details to everyone.
          </div>
        </div>

        <div className="mt-4">
          <div className="grid justify-between grid-cols-3 text-left">
            <span className="font-semibold">What</span>
            <span className="col-span-2">
              {booking.bookingType.name} between {firstName} {lastName} and{" "}
              {booking.customerName}
            </span>
          </div>
          <div className="grid my-4 justify-between grid-cols-3 text-left">
            <span className="font-semibold">When</span>
            <span className="col-span-2">
              {fromDate} {booking.bookedTime} WAT - {toDate} {toTime} WAT
            </span>
          </div>
          <div className="grid justify-between grid-cols-3 text-left">
            <span className="font-semibold">Who</span>
            <span className="col-span-2">
              {firstName} {lastName} - Organizer [{owner.email}]
              <br /> {booking.customerName} - Guest [{booking.customerEmail}]
            </span>
          </div>
          <div className="grid my-4 justify-between grid-cols-3 text-left">
            <span className="font-semibold">Where</span>
            <span className="col-span-2">i never sabi</span>
          </div>
          <div className="grid my-4 justify-between grid-cols-3 text-left">
            <span className="font-semibold">Description</span>
            <span className="col-span-2">
              {booking.bookingType.description}
            </span>
          </div>
          <div className="grid my-4 justify-between grid-cols-3 text-left">
            <span className="font-semibold">Price</span>
            <span className="col-span-2">
              {booking.price === 0
                ? "Free"
                : `₦${booking.price.toLocaleString("en-US")}`}
            </span>
          </div>
          <div className="grid my-4 justify-between grid-cols-3 text-left">
            <span className="font-semibold">Additional Notes</span>
            <span className="col-span-2">{booking.notes}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
