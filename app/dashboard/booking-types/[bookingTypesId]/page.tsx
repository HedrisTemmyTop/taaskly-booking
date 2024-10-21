import CreateBookingForm from "@/app/_components/CreateBookingForm";
import { getBookingType, getBookingTypes } from "@/app/_lib/bookingType";
import { BookingTypesResponse } from "@/app/_types/IBookingTypes";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  const bookingTypes: BookingTypesResponse[] =
    (await getBookingTypes()) as BookingTypesResponse[];
  const bookingTypesIds = bookingTypes.map((type) => ({
    bookingTypesId: String(type.slug),
  }));
  return bookingTypesIds;
}

export default async function Page({
  params,
}: {
  params: { bookingTypesId: string };
}) {
  const bookingType: BookingTypesResponse = (await getBookingType(
    params.bookingTypesId
  )) as BookingTypesResponse;
  if (!bookingType) {
    notFound();
  }
  return (
    <form className="flex justify-between flex-col md:flex-row gap-4 items-start pb-16 md:pb-0 ">
      <CreateBookingForm data={bookingType} />
    </form>
  );
}
