"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import HomeHeader from "./HomeHeader";

export default function Home({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showHeader =
    pathname === "/" || pathname === "/privacy" || pathname === "/terms";

  return showHeader ? (
    <main className="max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl py-8 px-4 vsm:px-8  m-auto">
      <HomeHeader />
      {children}
    </main>
  ) : (
    children
  );
}
