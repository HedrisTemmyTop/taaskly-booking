"use client";
import React, { ReactNode, useState } from "react";

export default function ProfileButton({ children }: { children: ReactNode }) {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>
      {showLogout && children}
      <button
        className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:border border-1 border-primary-400 rounded  py-2.5 px-3 bg-transparent text-inherit flex justify-between items-center gap-2"
        onClick={() => setShowLogout((prev) => !prev)}
      >
        <span className="border-2 font-semibold border-primary-400 rounded-full w-[28px] h-[28px]">
          I
        </span>
        <span className="whitespace-nowrap hidden lg:block">
          IDRIS BABALOLA
        </span>
      </button>
    </>
  );
}
