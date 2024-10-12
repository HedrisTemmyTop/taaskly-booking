import React, { ReactNode } from "react";

export default function Button({
  children,
  style,
  disabled,
}: {
  style: string;
  children: ReactNode | string;
  disabled?: boolean;
}) {
  return (
    <button className={`${style}`} disabled={disabled}>
      {children}
    </button>
  );
}
