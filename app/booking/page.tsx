import React from "react";
import { IoTimeOutline } from "react-icons/io5";

export default function Page() {
  return (
    <div className="grid grid-cols-1">
      <div className="border text-sm flex-col sm:flex-row  border-primary-400 hover:shadow-custom transition duration-300  cursor-pointer rounded-lg p-4 w-[100%] flex gap-7 sm:gap-14">
        <div className="flex sm:block justify-between gap-y-2 items-center flex-wrap">
          <h2 className="font-medium text-sm">Wed, October 9 2024</h2>
          <div className="my-1">08:30 AM - 08:45 AM</div>
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
          </div>
        </div>
        <div>
          <h2 className="font-medium">
            15 minutes meeting between IDRIS BABALOLA and IDRIS BABALOLA
          </h2>
          <div>&quot;message&quot;</div>
          <div>
            <span className="font-medium">Attendance:</span>
            <span className="ml-2">You and IDRIS BABALOLA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
