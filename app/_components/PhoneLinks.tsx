import React from "react";
import { sidebarLinks } from "../_data/sidebarLinks";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PhoneLinks({
  show,
  handleClick,
}: {
  show: boolean;
  handleClick: () => void;
}) {
  const pathname = usePathname();
  return (
    <aside
      className={`${
        show ? "bg-[#0006]  " : "duration-500 transition-all ease-in-out"
      }  block md:hidden   top-0 left-0 right-0 bottom-0 z-10  w-[100vw] fixed h-[100vh]`}
    >
      <nav
        className={`${
          show ? "border-t" : ""
        }  border-primary-400 bg-secondary-400 rounded-t-lg fixed bottom-16 w-full z-20 overflow-hidden 
    ${
      show ? "max-h-[500px] opacity-100" : "max-h-0 "
    } transition-all duration-500 ease-in-out`}
      >
        <ul className="px-4 pt-8 pb-20">
          {sidebarLinks.map((item) => (
            <li
              key={item.id}
              className={`w-full flex px-0 rounded text-base transition duration-300 ${
                pathname === `/${item.link.toLowerCase().replace(" ", "-")}`
                  ? "font-medium bg-primary-400 relative text-primary-400"
                  : "text-grey-300 hover:bg-grey-250"
              }`}
            >
              <div>
                <Link
                  href={`/${item.link.toLowerCase().replace(" ", "-")}`}
                  className={`flex h-12 items-center px-4 w-full transition-colors ${
                    pathname === `/${item.link.toLowerCase().replace(" ", "-")}`
                      ? "text-secondary-400"
                      : "text-primary-400"
                  }`}
                  onClick={handleClick}
                >
                  {item.icon}
                  <span className="text-tiny tanasobe:text-base ml-4">
                    {item.link}
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
