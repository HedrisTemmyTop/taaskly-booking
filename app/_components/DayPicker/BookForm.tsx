"use client";

import { ReactNode, useEffect, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import BookingForm from "../BookingForm";
import MyDatePicker from "../DayPicker";

export default function BookForm({ children }: { children: ReactNode }) {
  const [showForm, setShowForm] = useState(false);
  const [time, setTime] = useState("");
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const handleGoBack = function () {
    setTime("");
  };
  useEffect(() => {
    if (time && selected && !showForm) {
      setShowForm(true);
    } else {
      if (showForm) {
        setShowForm(false);
      }
    }
  }, [time, selected, showForm]);

  return (
    <div className="m-auto w-full min-h-[100vh] md:min-h-[463px] md:w-auto bg-secondary-400 flex  md:flex-row flex-col border-1 border border-[#E5E6EB]">
      <div className={`p-6 ${showForm ? "min-w-[240px]" : ""}`}>
        <div className="flex flex-col gap-2 ">
          <button
            className={`bg-transparent   
    text-inherit flex justify-between items-center gap-2`}
          >
            <span
              className="border-2 font-medium text border-primary-400 
      grid place-items-center rounded-full w-[30px] h-[30px]"
            >
              I
            </span>
          </button>
          <span className="uppercase ">IDRIS BABALOLA</span>
          <span className="text-xl font-medium">15 Minute</span>
          <span className=" text-vsm">lol</span>
          <div className="flex">
            {" "}
            <span className="bg-accent-400 p-1 items-center  flex rounded text-xs">
              <IoTimeOutline className="font-semibold" />
              <span>30m</span>
            </span>
            <span className="bg-accent-400 p-1 items-center  flex rounded text-xs ml-4">
              <span>₦30.00</span>
            </span>
          </div>{" "}
        </div>
      </div>
      {showForm && (
        <div className="min-w-[420px] p-4 border-l flex flex-col gap-4 border-[#E5E6EB]">
          <BookingForm>{children}</BookingForm>

          <div className="flex justify-end">
            <button type="button" onClick={handleGoBack}>
              Go back
            </button>
            <button
              type="submit"
              className="border hover:shadow-custom duration-300 px-8 py-2.5 border-primary-400 rounded ml-4"
            >
              Create Booking
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <>
          <div className="border-x border-[#e5e7eb]">
            <MyDatePicker setSelected={setSelected} selected={selected} />
          </div>
          <div className="pt-3 px-5 min-w-[240px]">
            <div className="flex justify-between">
              <span>
                <span className="font-semibold mr-1">Mon</span>
                <span>21</span>
              </span>
              <span className="border border-[#E5E6EB] rounded px-1 py-1">
                <button className="bg-primary-400 rounded px-2 py-0.5 text-secondary-400">
                  12h
                </button>
                <button className=" rounded px-2 py-0.5 text-primary-400">
                  24h
                </button>
              </span>
            </div>
            <div className="mt-4">
              <button
                className="border-[#E5E6EB] border w-full rounded text-sm py-2 hover:border-primary-400 duration-300"
                onClick={() => setShowForm(true)}
              >
                {" "}
                3:45pm
              </button>{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

//     3:45pm
//   </button>
// </div>
// </div>
