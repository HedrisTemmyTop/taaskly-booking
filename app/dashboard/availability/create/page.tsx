import CreateAvailabilityForm from "@/app/_components/CreateAvailabilityForm";
import React from "react";

export const metadata = {
  title: "Availability ",
  description: "Create Availability ",
};
export default function Page() {
  return (
    <div className="-mx-4">
      <CreateAvailabilityForm />
    </div>
  );
}
