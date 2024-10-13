"use client";

import React from "react";

export default function ShadowBtn({
  children,
  disabled,
  handleClick,
}: {
  children: string;
  disabled?: boolean;
  handleClick: () => void;
}) {
  return (
    <button
      className="border font-medium border-primary-400 order-2 md:order-3 px-10 text-4 text-primary-400 rounded-lg py-4 hover:shadow-custom transition-all"
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
