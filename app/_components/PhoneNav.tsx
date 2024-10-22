"use client";

import Link from "next/link";
import React, { useState } from "react";
import { sidebarLinks } from "../_data/sidebarLinks";
import { usePathname } from "next/navigation";
import { IoMdMenu } from "react-icons/io";
import truncateString from "../_utils/truncateString";
import PhoneLinks from "./PhoneLinks";

export default function PhoneNav() {
  const pathname = usePathname();
  const [isMoreClicked, setIsMoreClicked] = useState(false);
  const toggleMore = function () {
    setIsMoreClicked((prev) => !prev);
    };
  return (
    <>
      <PhoneLinks show={isMoreClicked} handleClick={toggleMore} />
      <footer className=" md:hidden  fixed bottom-0 w-full z-30 bg-secondary-400 px-2 vsm:px-5  block m h-16 border-t py-4 border-t-1 border-grey-400">
        <nav>
          <ul className="flex justify-between items-center">
            {sidebarLinks.slice(0, 4).map((item) => (
              <li
                key={item.id}
                className={` ${
                  pathname === `/${item.link.toLowerCase().replace(" ", "-")}`
                    ? " font-medium  relative text-primary-400  flex flex-col"
                    : "text-grey-300"
                } w-full lg:px-4 px-0 rounded text-sm hover:bg-grey-250  transaition duration-300`}
              >
                {" "}
                <Link
                  href={`/dashboard/${item.link
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className={`flex h-10  flex-col items-center w-full`}
                >
                  {item.icon}
                  <span className="text-tiny tanasobe:text-xs">
                    {truncateString(item.link)}
                  </span>
                </Link>
              </li>
            ))}
            <li
              className={` ${
                isMoreClicked
                  ? " font-medium  text-primary-400 relative  flex flex-col"
                  : "text-grey-300"
              } w-full lg:px-4 px-0 rounded text-sm hover:bg-grey-250  transaition duration-300`}
            >
              {" "}
              <button
                onClick={toggleMore}
                // href={`/${item.link.toLowerCase().replace(" ", "-")}`}
                className={`flex h-10  flex-col items-center w-full`}
              >
                <IoMdMenu className="text-2xl" />
                <span className="text-tiny tanasobe:text-xs">more</span>
              </button>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
