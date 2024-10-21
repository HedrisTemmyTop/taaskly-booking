"use client";

import { ChangeEvent, useEffect } from "react";
import { useBookingTypeContext } from "../_hooks/BookinTypesCtx";
import { BookingTypesResponse } from "../_types/IBookingTypes";
import ReusableInput from "./ReusableInput";

export default function CreateBookingForm({
  data,
  availabilites,
}: {
  data?: BookingTypesResponse;
  availabilites: { name: string; id: string }[];
}) {
  console.log("first");
  const handleSetAvailability = function (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    console.log(e.target);
    const selected = availabilites.find((av) => av.id == e.target.value);
    console.log(selected);
    if (selected) setAvailability(selected);
  };
  const {
    name,
    setName,
    description,
    setDescription,
    isPublic,
    setPublic,
    availability,
    setAvailability,
    price,
    setPrice,
    duration,
    setId,
    setDuration,
  } = useBookingTypeContext();
  useEffect(() => {
    if (data) {
      console.log(data);
      setName(data.name);
      setDescription(data.description);
      setPublic(data.public);
      const av = availabilites.find((av) => av.id === data.availability);
      if (av) setAvailability(av);
      setPrice(data.price);
      setDuration(data.duration);
      setId(data._id);
    } else {
      setName("");
      setDescription("");
      setPublic("Yes");
      setAvailability({
        id: "",
        name: "",
      });
      setPrice(null);
      setDuration(null);
      setId("");
    }
    // setAvailability(availabilites[0]);
  }, [
    data,
    setName,
    setAvailability,
    setDescription,
    setDuration,
    setId,
    setPrice,
    setPublic,
  ]);

  console.log(availabilites, availability);
  return (
    <>
      <div className="md:basis-1/2 basis-full w-full border-1 flex gap-4 flex-col border rounded-md px-4 py-6 border-primary-400">
        <ReusableInput
          label="Name"
          name="name"
          placeholder="Enter service name"
          value={name}
          onChange={(
            e: ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
          ) => setName(e.target.value)}
        />
        <ReusableInput
          label="Description"
          name="description"
          placeholder="Enter a brief description of your service"
          inputType="textarea"
          value={description}
          onChange={(
            e: ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
          ) => setDescription(e.target.value)} // Ensuring the right event type
        />
        <ReusableInput
          label="Availability"
          name="availability"
          inputType="select"
          option={availabilites}
          value={availability.id}
          onChange={handleSetAvailability} //
        />
        <div className="relative">
          <ReusableInput
            label="Duration"
            name="duration"
            placeholder="Enter how long this offering would take"
            inputType="input"
            type="number"
            value={duration}
            onChange={(
              e: ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            ) => setDuration(+e.target.value)} // Ensuring the right event type
          />
          <span className="absolute rounded-full right-4 text-xs top-1/2 px-3 py-1 bg-[#f7f7f7] border border-primary-400">
            Minutes
          </span>
        </div>
      </div>
      <div className="basis-full w-full md:basis-1/2 border-1 flex gap-4 flex-col border rounded-md px-4 py-6 border-primary-400">
        <ReusableInput
          label="Price"
          name="price"
          placeholder="Enter price"
          inputType="input"
          type="number"
          value={price}
          onChange={(
            e: ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
          ) => setPrice(+e.target.value)} // Ensuring the right event type
        />
        <ReusableInput
          label="Public"
          name="public"
          inputType="select"
          option={["Yes", "No"]}
          tag={"array"}
          value={isPublic}
          onChange={(
            e: ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
          ) => setPublic(e.target.value as "Yes" | "No")} // Ensuring the right event type
        />
      </div>
    </>
  );
}
