"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineMoreHoriz } from "react-icons/md";
import BookingTypes from "../_icons/BookingTypes";
import View from "../_icons/View";
import { BookingTypesResponse } from "../_types/IBookingTypes";
import Modal from "./Modal";
import ToggleButton from "./ToggleButton";
import { useRouter } from "next/navigation";
import { deleteBookingType, toggleBookingType } from "../_lib/bookingType";
import BackDrop from "./BackDrop";

export default function BookingButtons({
  booking,
  email = "",
  index,
  bookingLength,
}: {
  booking: BookingTypesResponse;
  email: string;
  index: number;
  bookingLength;
}) {
  const [isEnabled, setIsEnabled] = useState(booking.active);
  const [showMore, setShowMore] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [backdrop, setBackdrop] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handledToggle = async () => {
    setIsEnabled((prev) => !prev);
    const response = await toggleBookingType(booking._id, !isEnabled);
    if (response?.success) {
      setSuccess(response.message);
    } else {
    }
  };
  const handleMore = () => {
    setShowMore((prev) => !prev);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.protocol}/${window.location.host}/${email}/${booking.slug}`
      );
      setSuccess("Link has been copied");
    } catch {
      setErr("Could not copy !!");
    }
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteBookingType(booking._id);
    if (result.success) {
      setSuccess(result.message);
    } else {
      setErr("Something went wrong, try again");
    }
    setIsDeleting(false);
    setBackdrop(false);
  };
  return (
    <div className="flex ml-4 relative min-w-[30px] [@media(min-width:820px)]:min-w-[275px]">
      {success && (
        <Modal
          type="success"
          message={success}
          handleCancel={() => setSuccess("")}
        />
      )}

      {err && (
        <Modal type="fail" message={err} handleCancel={() => setErr("")} />
      )}
      <ToggleButton
        hidden={true}
        isActive={isEnabled}
        onEnable={handledToggle}
      />
      <Link
        href={`/${email}/${booking.slug}`}
        className="rounded duration-300 hover:shadow-custom hidden mx-2 font-medium text-sm [@media(min-width:820px)]:flex border max-h-[30px] items-center text-primary-400 boder-1 border-primary-400 py-1 px-2 bg-transparent"
        target="_blank"
      >
        <View />
        <span className="ml-2">View</span>
      </Link>
      <button
        className="rounded cursor-copy mr-2 hidden text-sm font-medium [@media(min-width:820px)]:flex border max-h-[30px] items-center text-primary-400 boder-1 border-primary-400 py-1 px-2 bg-transparent"
        onClick={handleCopy}
      >
        <BookingTypes />
        <span className="">Copy Link</span>
      </button>
      <button
        className="border border-primary-400 max-w-[35px]   px-1  text-8 font-semibold text-primary-400 rounded grid place-items-center py-1 max-h-[30px] hover:shadow-custom transition-all"
        onClick={handleMore}
      >
        <MdOutlineMoreHoriz />
      </button>
      {/*  */}
      {showMore && (
        <div
          className={`shadow-lg flex z-10 ${
            index === bookingLength - 1 ? "top-[35%]" : "top-[30%]"
          } bg-secondary-400 flex-col absolute right-0  [@media(min-width:820px)]:bottom-[-45%] w-[150px] [@media(min-width:820px)]:w-[75%] rounded-lg p-1 [@media(min-width:820px)]:p-2 border-1 border-primary-400 border `}
        >
          <Link
            href={`/${email}/${booking.slug}`}
            target="_blank"
            className="px-4  [@media(min-width:820px)]:hidden [@media(min-width:820px)]:mb-2 mb-1 transition duration-300 ease-out hover:bg-primary-400 hover:text-secondary-400 rounded py-2 flex items-center"
          >
            <View />
            <span className="ml-2 text-sm">Preview</span>
          </Link>
          <button
            className="cursor-copy px-4 [@media(min-width:820px)]:mb-2 mb-1  [@media(min-width:820px)]:hidden transition duration-300 ease-out hover:bg-primary-400 hover:text-secondary-400 rounded py-2 flex items-center"
            onClick={handleCopy}
          >
            <SmallBokkingTypes />
            <span className="ml-1 text-sm">Copy link</span>
          </button>
          <button
            className="px-4 [@media(min-width:820px)]:mb-2 mb-1 transition duration-300 ease-out hover:bg-primary-400 hover:text-secondary-400 rounded py-2 flex items-center"
            onClick={() => {
              router.push(`/dashboard/booking-types/${booking.slug}`);
            }}
          >
            <FiEdit />
            <span className="ml-2 text-sm">Edit</span>
          </button>
          <button
            className="px-4 py-2 transition duration-300 ease-out flex items-center hover:bg-red-500 rounded hover:text-secondary-400  text-red-500"
            onClick={() => setBackdrop(true)}
          >
            <AiOutlineDelete className="text-lg" />
            <span className="ml-2 text-sm">Delete</span>
          </button>

          <BackDrop
            onClose={() => setBackdrop(false)}
            isOpen={backdrop}
            message={`Are you sure you want to delete ${booking.name}`}
            onConfirm={handleDelete}
            loading={isDeleting}
          />
        </div>
      )}
    </div>
  );
}

const SmallBokkingTypes = () => (
  <svg
    data-v-a338b445=""
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-link-icon mr-2"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);
