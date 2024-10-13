import { IoTimeOutline } from "react-icons/io5";
import BookingButtons from "../_components/BookingButtons";

export default function Page() {
  return (
    <div className="grid grid-cols-1">
      <div className="border border-primary-400 rounded-lg p-4 w-[100%] flex justify-between">
        <div>
          <div className="flex items-center">
            <h2 className="text-xl m-0 font-semibold">15 Minute Meeting </h2>
            <span className="ml-2 font-light text-sm hidden sm:block">
              /hedristemmytop/15-minute-meeting{" "}
            </span>
          </div>
          <div className="text-sm my-1  sm:my-2">
            Book a meeting with me for 15 minutes!
          </div>
          <div className="flex">
            {" "}
            <span className="bg-accent-400 p-1 items-center  flex rounded-sm text-xs">
              <IoTimeOutline />
              <span>30m</span>
            </span>
            <span className="bg-accent-400 p-1 items-center  flex rounded-sm text-xs ml-4">
              <IoTimeOutline />
              <span>₦50,000</span>
            </span>
          </div>{" "}
        </div>
        <BookingButtons />
        <button className="text-4xl fixed bottom-24 block md:hidden right-10 text-secondary-400 bg-primary-400 w-[60px] h-[60px] rounded-full">
          +
        </button>
      </div>
    </div>
  );
}
