import CreateBookingForm from "@/app/_components/CreateBookingForm";
import { getBookingType, getBookingTypes } from "@/app/_lib/bookinType";
import { BookingTypesResponse } from "@/app/_types/IBookingTypes";
import React from "react";

export async function generateStaticParams() {
  const bookingTypes: BookingTypesResponse[] =
    (await getBookingTypes()) as BookingTypesResponse[];
  const slugs = bookingTypes.map((type) => ({
    slugs: String(type.slug),
  }));
  return slugs;
}

export default async function Page({
  params,
}: {
  params: { bookingTypesId: string };
}) {
  const bookinType: BookingTypesResponse = (await getBookingType(
    params.bookingTypesId
  )) as BookingTypesResponse;
  console.log(bookinType);
  return (
    <form className="flex justify-between flex-col md:flex-row gap-4 items-start pb-16 md:pb-0 ">
      <CreateBookingForm data={bookinType} />
    </form>
  );
}