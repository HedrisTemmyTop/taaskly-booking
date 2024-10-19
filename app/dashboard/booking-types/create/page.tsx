import CreateBookingForm from "@/app/_components/CreateBookingForm";
import React from "react";

export default function Page() {
  return (
    <form className="flex justify-between flex-col md:flex-row gap-4 items-start pb-16 md:pb-0 ">
      <CreateBookingForm />
    </form>
  );
}
