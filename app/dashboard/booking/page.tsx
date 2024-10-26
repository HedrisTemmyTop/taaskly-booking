import Price from "@/app/_icons/Price";
import { auth } from "@/app/_lib/auth";
import { getUserBookings } from "@/app/_lib/booking";
import { SessionInterface } from "@/app/_types/user";
import { addDuration } from "@/app/_utils/generateTime";
import { format } from "date-fns";
import { IoTimeOutline } from "react-icons/io5";

export default async function Page() {
  const session = await auth();
  const bookings = await getUserBookings();
  const nameParts = (session as SessionInterface).user.name.split(" ");

  const firstName = nameParts[0] || "";
  const lastName = nameParts[nameParts.length - 1];

  return (
    <div className="grid grid-cols-1 gap-4">
      {bookings.length === 0 && (
        <div>
          You don`t have any bookings record yet, advertise your service so that
          people can book you!
        </div>
      )}

      {bookings.map((booking) => {
        const toTime = addDuration(booking.bookedTime, booking.duration);
        return (
          <div
            className="border text-sm flex-col sm:flex-row  border-primary-400 hover:shadow-custom transition duration-300  cursor-pointer rounded-lg p-4 w-[100%] flex gap-7 sm:gap-14"
            key={booking._id}
          >
            <div className="flex sm:block justify-between gap-y-2 items-center flex-wrap">
              <h2 className="font-medium text-sm">
                {format(booking.bookedDate, "eee, MMMM d yyyy")}
              </h2>
              <div className="my-1 ">
                {booking.bookedTime.toUpperCase()} - {toTime}
              </div>
              <div className="flex">
                {" "}
                <span className="bg-accent-400 p-1 items-center  flex rounded-sm text-xs">
                  <IoTimeOutline />
                  <span className="ml-1">{booking.duration}m</span>
                </span>
                <span className="bg-accent-400 p-1 items-center  flex rounded-sm text-xs ml-4">
                  <Price />
                  <span className="ml-1">
                    {booking.price === 0
                      ? "Free"
                      : `₦${booking.price.toLocaleString("en-US")}.00`}
                  </span>
                </span>
              </div>
            </div>
            <div>
              <h2 className="font-medium">
                15 minutes meeting between {firstName} {lastName} and{" "}
                {booking.customerName}
              </h2>
              <div>&quot;{booking.notes}&quot;</div>
              <div>
                <span className="font-medium">Attendance:</span>
                <span className="ml-2">You and {booking.customerEmail}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
