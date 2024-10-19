"use client";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import truncateString from "../_utils/truncateString";

export default function ProfileButton({
  children,
  name,
  image,
}: {
  children: ReactNode;
  name?: string;
  image?: string;
}) {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>
      {showLogout && children}
      <button
        className="absolute bottom-4 left-1/2 lg:w-[100%] lg:max-w-[170px] -translate-x-1/2 lg:border border-1 border-primary-400 rounded  py-2.5 px-3 bg-transparent text-inherit flex justify-between items-center gap-2"
        onClick={() => setShowLogout((prev) => !prev)}
      >
        <Image
          width={100}
          height={100}
          className="border-2 hidden lg:block font-semibold border-primary-400 rounded-full w-[28px] h-[28px]"
          src={image || ""}
          alt={name || ""}
        />
        <div className="border-2 block lg:hidden font-semibold border-primary-400 rounded-full w-[28px] h-[28px]">
          {name && name[0]}
        </div>
        <span className="whitespace-nowrap text-sm hidden lg:block">
          {truncateString(name || "", 14)}
        </span>
      </button>
    </>
  );
}
