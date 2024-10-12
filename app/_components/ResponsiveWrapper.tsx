import React, { ReactNode } from "react";

export default function ResponsiveWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="max-w-screen-xl text-primary-400 m-auto grid grid-cols-1 mt-20 py-4 place-items-center">
      {children}
    </div>
  );
}
