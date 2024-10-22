"use client";

import React, { ReactNode } from "react";

export default function ShadowBtn({
  children,
  disabled,
  handleClick,
  hide = true,
}: {
  children: string | ReactNode;
  disabled?: boolean;
  handleClick: () => void;
  hide?: boolean;
}) {
  return (
    <button
      className={`border   disabled:bg-grey-500 disabled:cursor-wait font-medium border-primary-400 order-2 md:order-3 px-5 vsm:px-10 text-4 text-primary-400 rounded-lg py-2 vsm:py-4 hover:shadow-custom transition-all ${
        hide ? "md:block hidden" : ""
      }`}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
