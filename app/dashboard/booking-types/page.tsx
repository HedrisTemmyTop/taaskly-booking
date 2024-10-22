import { auth } from "@/app/_lib/auth";
import BookingTypesModel from "@/app/models/BookingTypes";
import { dbConnect } from "@/app/_lib/mongodb";
import { BookingTypesResponse } from "@/app/_types/IBookingTypes";
import { SessionInterface } from "@/app/_types/user";
import { IoTimeOutline } from "react-icons/io5";
import BookingButtons from "../../_components/BookingButtons";
import Price from "@/app/_icons/Price";

export default async function Page() {
  const session = (await auth()) as SessionInterface;

  await dbConnect();
  const bookingTypes: BookingTypesResponse[] = await BookingTypesModel.find({
    owner: session?.user?.userId,
    disabled: false,
  });
  // console.log(bookingTypes);
  //   const plainBookingTypes = bookingTypes.map((booking) => ({
  //   ...booking,
  //   _id: booking._id.toString(), // Convert to string
  //   // Include other fields as necessary
  // }));
  return (
    <div className="grid gap-4 grid-cols-1">
      {bookingTypes.length === 0 && (
        <div> You don`t have a booking types yet</div>
      )}
      {bookingTypes.map((type: BookingTypesResponse, index) => {
        return (
          <div
            className="border border-primary-400 rounded-lg p-4 w-[100%] flex justify-between"
            key={type._id}
          >
            <div className="">
              <div className="flex items-center">
                <h2 className="text-xl m-0 font-semibold">{type.name} </h2>
                <span className="ml-2 font-thin text-xs hidden sm:block">
                  /{session?.user?.email}/{type.slug}{" "}
                </span>
              </div>
              <div className="text-sm my-1 break-all sm:my-2">
                {type.description}
              </div>
              <div className="flex">
                {" "}
                <span className="bg-accent-400 p-1 items-center  flex rounded-sm text-xs">
                  <IoTimeOutline />
                  <span className="ml-1">{type.duration}m</span>
                </span>
                <span className="bg-accent-400 p-1 items-center  flex rounded-sm text-xs ml-4">
                  <span className="flex items-center">
                    <Price />
                    <span className="ml-1">
                      {" "}
                      {type.price > 0
                        ? ` ₦${type.price.toLocaleString("en-US")}`
                        : "Free"}
                    </span>
                  </span>
                </span>
              </div>{" "}
            </div>
            <BookingButtons
              booking={type}
              bookingLength={bookingTypes.length}
              index={index}
              email={session?.user?.email || ""}
            />
          </div>
        );
      })}
    </div>
  );
}
