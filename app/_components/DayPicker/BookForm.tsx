"use client";

import { ReactNode, useEffect, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import BookingForm from "../BookingForm";
import MyDatePicker from "../DayPicker";

import { useAuthContext } from "@/app/_hooks/AuthFormContext";
import Booking from "@/app/_icons/Booking";
import NoTime from "@/app/_icons/NoTime";
import Price from "@/app/_icons/Price";
import { createBooking, verifyPayment } from "@/app/_lib/booking";
import { ErrorResponse } from "@/app/_types/user";
import {
  addDuration,
  convertTo12HourFormat,
  days,
  generateTimeSlots,
  months,
} from "@/app/_utils/generateTime";
import validateEmail from "@/app/_utils/validateEmail";
import { useRouter } from "next/navigation";
import { PaystackButton } from "react-paystack";
import BackDrop from "../BackDrop";
import Modal from "../Modal";
import { BookingTypesResponse } from "@/app/_types/IBookingTypes";

export default function BookForm({
  children,
  booking,
  ownersName,
  ownersEmail,
  ownersPhoneNumber,
}: {
  children: ReactNode;
  booking: BookingTypesResponse;
  ownersName: string;
  ownersEmail: string;
  ownersPhoneNumber: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [time, setTime] = useState("");
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [timeframe, setTimeFrame] = useState<"12h" | "24h">("12h");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<null | number>(null);
  const { selectedCountry } = useAuthContext();
  const router = useRouter();

  const nameParts = ownersName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts[nameParts.length - 1];
  const isFormReady =
    validateEmail(email) &&
    name &&
    time &&
    selectedDay &&
    phoneNumber &&
    notes.split(" ").length > 3;
  const handleGoBack = () => {
    setTime("");
  };

  const handleSetTime = (selectedTime: string) => {
    setTime(
      timeframe === "12h" ? selectedTime : convertTo12HourFormat(selectedTime)
    );
  };
  const handleCreateBooking = async (reference) => {
    const bookinData = {
      price: booking.price,
      bookingType: booking._id,
      customerName: name,
      customerEmail: email,
      customerPhoneNumber: phoneNumber,
      bookedDate: selectedDay,
      bookedTime: time,
      notes,
      isPaid: true,
      duration: booking.duration,
      ownersEmail,
      ownersName,
      ownersPhoneNumber,
      description: booking.description,
      reference: reference.reference,

      bookingTitle: booking.name,
      countryCode: `${selectedCountry.idd?.root}
            ${
              selectedCountry.idd?.suffixes?.[0] &&
              selectedCountry.idd.suffixes[0]
            }`,
    };
    try {
      console.log(reference);

      setLoading(true);
      let response;

      if (booking.price > 0) response = await verifyPayment(reference);
      // const data = await response.json();
      // console.log(data);
      console.log(response);
      if (bookinData.price === 0 || response.status) {
        const result = await createBooking(bookinData);
        console.log(result);
        if (result.success && result.data) {
          setSuccess(result.message);
          setTimeout(() => {
            router.push(`/booking/${result.data.slug}`);
          }, 2000);
        } else {
          throw new Error(result.message);
        }
      } else {
        throw new Error(
          "Something went wrong, if you have paid, contact taaskly support @hedristemitope2001@gmail.com"
        );
      }
    } catch (error) {
      const err = error as ErrorResponse;
      console.error(error, "twilio error");
      setErr(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const componentProps = {
    email: "hedristemitope2001@gmail.com",
    amount: booking.price * 100, // Paystack expects amount in kobo (NGN cents)
    metadata: {
      name: "he",
      phoneNumber: "08161126466",
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customerName",
          value: name,
        },
        {
          display_name: "Customer Email",
          variable_name: "customerEmail",
          value: email,
        },
        {
          display_name: "Owner's Name",
          variable_name: "ownerNamae",
          value: ownersName,
        },
        {
          display_name: "Owner's Email",
          variable_name: "ownerEmail",
          value: ownersName,
        },
      ],
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    text: "Create Booking",
    onSuccess: handleCreateBooking,
  };

  useEffect(() => {
    if (time && selectedDay && !showForm) {
      setShowForm(true);
    } else if (!time || (!selectedDay && showForm)) {
      setShowForm(false);
    }
  }, [time, selectedDay, showForm]);
  const inActiveDays: number[] = genInactiveDays(booking);

  const timeArr = genTimeArr(booking, selectedDay);
  const availableTime =
    selectedDay && generateTimeSlots(timeArr, timeframe, selectedDay);
  console.log(availableTime, timeArr);

  return (
    <div className="m-auto w-full min-h-[100vh] md:min-h-[463px] md:w-auto bg-secondary-400 flex md:flex-row flex-col border-1 border border-[#E5E6EB]">
      {err && (
        <Modal type="fail" message={err} handleCancel={() => setErr("")} />
      )}
      {success && (
        <Modal
          type="success"
          message={success}
          handleCancel={() => setSuccess("")}
        />
      )}

      <BackDrop
        loading={loading}
        message="Please wait while we create your booking"
        isOpen={loading}
        type={"loading"}
        label="Creating Booking"
      />
      <div
        className={`p-6 ${
          showForm
            ? "md:min-w-[220px] max-w-[500px]"
            : "max-w-[220px] lg:w-[240px]"
        }`}
      >
        <div className="flex flex-col gap-2 ">
          <button
            type="button"
            className="bg-transparent text-inherit flex justify-between items-center gap-2"
          >
            <span className="border-2 font-medium text border-primary-400 grid place-items-center rounded-full w-[30px] h-[30px]">
              I
            </span>
          </button>
          <span className="uppercase">
            {firstName} {lastName}
          </span>
          <span className="text-xl font-medium">{booking.name}</span>
          <span className="text-sm leading-snug">{booking.description}</span>
          {selectedDay && time && (
            <span className="flex my-4">
              <Booking />
              <span className="flex flex-col text-sm">
                <span className="capitalize">
                  {days[selectedDay.getDay()]}, {months[selectedDay.getMonth()]}
                  , {selectedDay.getFullYear()}
                </span>
                <span>
                  {time} - {addDuration(time, booking.duration)}
                </span>
              </span>
            </span>
          )}
          <div className="flex">
            <span className="bg-accent-400 p-1 items-center flex rounded text-xs">
              <IoTimeOutline className="font-semibold" />
              <span>{booking.duration}m</span>
            </span>
            <span className="bg-accent-400 p-1 items-center flex rounded text-xs ml-4">
              <span className="flex items-center">
                <Price />

                <span className="ml-1">
                  {booking.price > 0
                    ? ` ₦${booking.price.toLocaleString("en-US")}`
                    : "Free"}
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>

      {showForm ? (
        <div className="md:min-w-[420px] min-w-full p-4 border-l flex flex-col gap-4 border-[#E5E6EB]">
          <BookingForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            notes={notes}
            setNotes={setNotes}
          >
            {children}
          </BookingForm>
          <div className="flex justify-end">
            <button type="button" onClick={handleGoBack}>
              Go back
            </button>
            {booking.price === 0 ? (
              <button
                type="submit"
                className="border disabled:cursor-not-allowed hover:shadow-custom duration-300 px-8 py-2.5 border-primary-400 rounded ml-4"
                onClick={handleCreateBooking}
                disabled={!isFormReady}
              >
                Create Booking
              </button>
            ) : (
              <PaystackButton
                className="border disabled:cursor-not-allowed hover:shadow-custom duration-300 px-8 py-2.5 border-primary-400 rounded ml-4"
                {...componentProps}
                disabled={!isFormReady}
              />
            )}
          </div>
        </div>
      ) : (
        <SelectDate
          availableTime={availableTime}
          handleSetTime={handleSetTime}
          selectedDay={selectedDay}
          inActiveDays={inActiveDays}
          setSelectedDay={setSelectedDay}
          timeframe={timeframe}
          setTimeFrame={setTimeFrame}
        />
      )}
    </div>
  );
}

const SelectDate = function ({
  availableTime,
  handleSetTime,
  selectedDay,
  inActiveDays,
  setSelectedDay,
  timeframe,
  setTimeFrame,
}) {
  return (
    <>
      <div className="border-x border-[#e5e7eb]">
        <MyDatePicker
          setSelected={setSelectedDay}
          selected={selectedDay}
          disabledDays={inActiveDays}
        />
      </div>
      <div className="pt-3 px-5 md:w-[240px] w-full h-[240px]">
        <div className="flex justify-between">
          <span>
            <span className="font-semibold mr-1">Mon</span>
            <span>21</span>
          </span>
          <span className="border border-[#E5E6EB] rounded px-1 py-1">
            <button
              type="button"
              className={`${
                timeframe === "12h"
                  ? "bg-primary-400 text-secondary-400"
                  : "bg-transparent text-primary-400"
              } rounded px-2 py-0.5 duration-300`}
              onClick={() => setTimeFrame("12h")}
            >
              12h
            </button>
            <button
              type="button"
              className={`${
                timeframe === "24h"
                  ? "bg-primary-400 text-secondary-400"
                  : "bg-transparent text-primary-400"
              } rounded px-2 py-0.5 duration-300 `}
              onClick={() => setTimeFrame("24h")}
            >
              24h
            </button>
          </span>
        </div>
        <div className="mt-4 h-[380px] overflow-auto">
          {availableTime.length > 0 ? (
            availableTime.map((t) => (
              <button
                type="button"
                className="border-[#E5E6EB] mb-2 border w-full rounded text-sm py-2 hover:border-primary-400 duration-300"
                onClick={() => handleSetTime(t)}
                key={t}
              >
                {t}
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center mt-4">
              <NoTime />
              <div className="text-xl text-center mt-2">No Time Available</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const genInactiveDays = (booking) => {
  const inActiveDays: number[] = [];
  if (!booking.availability.monday.isActive) {
    inActiveDays.push(1);
  }
  if (!booking.availability.tuesday.isActive) {
    inActiveDays.push(2);
  }

  if (!booking.availability.wednesday.isActive) {
    inActiveDays.push(3);
  }
  if (!booking.availability.thursday.isActive) {
    inActiveDays.push(4);
  }
  if (!booking.availability.friday.isActive) {
    inActiveDays.push(5);
  }

  if (!booking.availability.saturday.isActive) {
    inActiveDays.push(6);
  }
  if (!booking.availability.sunday.isActive) {
    inActiveDays.push(0);
  }
  return inActiveDays;
};
const genTimeArr = (booking, selectedDay) => {
  let timeArr = [];
  if (selectedDay?.getDay() === 0) {
    timeArr = booking.availability.sunday.time;
  }
  if (selectedDay?.getDay() === 1) {
    timeArr = booking.availability.monday.time;
  }
  if (selectedDay?.getDay() === 2) {
    timeArr = booking.availability.tuesday.time;
  }
  if (selectedDay?.getDay() === 3) {
    timeArr = booking.availability.wednesday.time;
  }
  if (selectedDay?.getDay() === 4) {
    timeArr = booking.availability.thursday.time;
  }
  if (selectedDay?.getDay() === 5) {
    timeArr = booking.availability.friday.time;
  }
  if (selectedDay?.getDay() === 6) {
    timeArr = booking.availability.saturday.time;
  }

  return timeArr;
};
