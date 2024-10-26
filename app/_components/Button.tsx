import React, { ReactNode } from "react";

export default function Button({
  children,
  style,
  disabled,
  onClick,
}: {
  style: string;
  children: ReactNode | string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button className={`${style}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
