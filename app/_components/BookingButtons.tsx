"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineMoreHoriz } from "react-icons/md";
import BookingTypes from "../_icons/BookingTypes";
import View from "../_icons/View";
import ToggleButton from "./ToggleButton";

export default function BookingButtons() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handledToggle = () => {
    setIsEnabled((prev) => !prev);
  };
  const handleMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="flex  relative">
      <ToggleButton isActive={isEnabled} onEnable={handledToggle} />
      <Link
        href="/"
        className="rounded hidden mx-2 font-medium text-sm [@media(min-width:820px)]:flex border max-h-[30px] items-center text-primary-400 boder-1 border-primary-400 py-1 px-2 bg-transparent"
      >
        <View />
        <span className="ml-2">View</span>
      </Link>
      <Link
        href="/"
        className="rounded mr-2 hidden text-sm font-medium [@media(min-width:820px)]:flex border max-h-[30px] items-center text-primary-400 boder-1 border-primary-400 py-1 px-2 bg-transparent"
      >
        <BookingTypes />
        <span className="">Copy Link</span>
      </Link>
      <button
        className="border border-primary-400 max-w-[35px]   px-1  text-8 font-semibold text-primary-400 rounded grid place-items-center py-1 max-h-[30px] hover:shadow-custom transition-all"
        onClick={handleMore}
      >
        <MdOutlineMoreHoriz />
      </button>
      {/*  */}
      {showMore && (
        <div className="shadow-lg flex z-30 bg-secondary-400 flex-col absolute right-0 bottom-[-90%] tanasobe:bottom-[-140%] sm:bottom-[-120%] [@media(min-width:820px)]:bottom-[-45%] w-[150px] [@media(min-width:820px)]:w-[75%] rounded-lg p-1 [@media(min-width:820px)]:p-2 border-1 border-primary-400 border">
          <button className="px-4  [@media(min-width:820px)]:hidden [@media(min-width:820px)]:mb-2 mb-1 transition duration-300 ease-out hover:bg-primary-400 hover:text-secondary-400 rounded py-2 flex items-center">
            <View />
            <span className="ml-2 text-sm">Preview</span>
          </button>
          <button className="px-4 [@media(min-width:820px)]:mb-2 mb-1  [@media(min-width:820px)]:hidden transition duration-300 ease-out hover:bg-primary-400 hover:text-secondary-400 rounded py-2 flex items-center">
            <SmallBokkingTypes />
            <span className="ml-1 text-sm">Copy link</span>
          </button>
          <button className="px-4 [@media(min-width:820px)]:mb-2 mb-1 transition duration-300 ease-out hover:bg-primary-400 hover:text-secondary-400 rounded py-2 flex items-center">
            <FiEdit />
            <span className="ml-2 text-sm">Edit</span>
          </button>
          <button className="px-4 py-2 transition duration-300 ease-out flex items-center hover:bg-red-500 rounded hover:text-secondary-400  text-red-500">
            <AiOutlineDelete className="text-lg" />
            <span className="ml-2 text-sm">Delete</span>
          </button>
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
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-link-icon mr-2"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);
