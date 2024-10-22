import React from "react";
export const metadata = {
  title: "Contact",
};

export default function Page() {
  return (
    <div className="grid grid-cols-1">
      <div className="border border-primary-400 cursor-pointer hover:shadow-custom transition duration-300 rounded-lg p-4 w-[100%] max-w-[575px]  text-sm">
        <div className="flex gap-4 items-center">
          <span className="font-medium">IDRIS BABALOLA</span>
          <span className="bg-accent-400 p-1 items-center  flex rounded-sm text-xs">
            <span className="font-medium">1 booking</span>
          </span>
        </div>
        <div className="my-2">hedristemitope2001@gmail.com</div>
        <div className="mb-2">+2348161126466</div>
        <div className="flex gap-4">
          <span className="font-medium">Created at:</span>
          <span className="">Mon, October 7, 2024</span>
        </div>
      </div>
    </div>
  );
}
