"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import HomeHeader from "./HomeHeader";
import Sidebar from "./Sidebar";
import { sidebarLinks } from "../_data/sidebarLinks";
import PhoneNav from "./PhoneNav";
import DashboardHeader from "./DashboardHeader";

export default function Home({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showHeader =
    pathname === "/" || pathname === "/privacy" || pathname === "/terms";
  const noHeader = pathname === "/auth/login" || pathname === "/auth/register";

  const showSidebar = sidebarLinks.some(
    (item) => `/${item.link.toLowerCase().replace(" ", "-")}` === pathname
  );
  let content = <></>;

  if (showHeader) {
    content = (
      <main className="max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl py-8 px-4 vsm:px-8  m-auto">
        <HomeHeader />
        {children}
      </main>
    );
  }
  if (noHeader) {
    content = <>{children}</>;
  }
  if (showSidebar) {
    content = (
      <section className="flex">
        <PhoneNav />
        <Sidebar />
        <main className="flex-1">
          <DashboardHeader />
          <div className="p-4 text-primary-400"> {children}</div>
        </main>
      </section>
    );
  }

  return content;
}
