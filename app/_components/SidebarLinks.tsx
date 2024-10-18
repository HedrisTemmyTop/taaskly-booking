"use client";

import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "../_data/sidebarLinks";

export default function SidebarLinks() {
  const pathname = usePathname();
  return (
    <ul className="w-full px-2 lg:px-4 flex flex-col gap-2">
      {sidebarLinks.map((item) => (
        <li
          key={item.id}
          className={` ${
            pathname ===
            `/dashboard/${item.link.toLowerCase().replace(" ", "-")}`
              ? "bg-grey-250 lg:before:inline-block before:hidden font-medium before:bg-primary-400 before:h-full  before:absolute relative before:left-[-8%] before:w-1.5 before:rounded-l-sm flex before:content-['']"
              : ""
          } w-full lg:px-4 px-0 rounded text-sm hover:bg-grey-250  transaition duration-300`}
        >
          {" "}
          <Link
            href={`/dashboard/${item.link.toLowerCase().replace(" ", "-")}`}
            className={`flex h-10  items-center w-full`}
          >
            {item.icon}
            <span className="hidden lg:block">{item.link}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
