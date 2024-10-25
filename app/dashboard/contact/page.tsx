import { getUserBookingStats } from "@/app/_lib/booking";
import { format } from "date-fns";
export const metadata = {
  title: "Contact",
};

export default async function Page() {
  // const session = await auth();
  const bookings = await getUserBookingStats();

  // console.log(bookings);

  // const nameParts = (session as SessionInterface).user.name.split(" ");

  // const firstName = nameParts[0] || "";
  // const lastName = nameParts[nameParts.length - 1];
  return (
    <div className="grid grid-cols-1">
      {bookings.map((booking) => (
        <div
          className="border border-primary-400 cursor-pointer hover:shadow-custom transition duration-300 rounded-lg p-4 w-[100%] max-w-[575px]  text-sm mb-4"
          key={booking.latestBooking._id}
        >
          <div className="flex gap-4 items-center">
            <span className="font-medium">IDRIS BABALOLA</span>
            <span className="bg-accent-400 p-1 items-center  flex rounded-sm text-xs">
              <span className="font-medium">
                {booking.numberOfBookings} booking
                {booking.numberOfBookings > 1 && "s"}
              </span>
            </span>
          </div>
          <div className="my-2">{booking.latestBooking.customerEmail}</div>
          <div className="mb-2">
            {booking.latestBooking.customerPhoneNumber}
          </div>
          <div className="flex gap-4">
            <span className="font-medium">Created at:</span>
            <span className="">
              {format(booking.latestBooking.bookedDate, "eee, MMMM d yyyy")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
