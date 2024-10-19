import React from "react";

export default function Page() {
  return (
    <div className="grid grid-cols-1">
      <div className="border-2 border-primary-400 rounded-lg p-4 w-[100%] ">
        <div className="flex flex-col">
          <span className="font-bold">Available Balance</span>
          <span className="text-5xl mt-[-12px] font-extrabold">₦0.00</span>
        </div>
        <button className="text-secondary-400 w-full h-[46px] mt-3 border border-1 border-primary-400 rounded bg-[#756bfe]">
          Withdraw Money
        </button>
      </div>
    </div>
  );
}
