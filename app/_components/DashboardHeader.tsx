import React from "react";
import ShadowBtn from "./ShadowBtn";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "../_data/sidebarLinks";

export default function DashboardHeader() {
  const pathname = usePathname();

  const currentHead = sidebarLinks.find(
    (link) => `/${link.link.toLowerCase().replace(" ", "-")}` === pathname
  );

  return (
    <header className="flex flex-1 justify-between items-center px-4 py-4 bg-secondary-400 text-primary-400 border-b border-b-1 border-grey-250">
      <div>
        <h2 className="text-xl font-semibold capitalize">
          {currentHead?.link}
        </h2>
        <span className="text-sm">{currentHead?.headText}</span>
      </div>
      <div className="hidden md:block">
        {currentHead?.button && (
          <ShadowBtn handleClick={() => {}}>{currentHead.button}</ShadowBtn>
        )}
      </div>
      <button
        className="bg-transparent  text-inherit flex md:hidden justify-between items-center gap-2"
        // onClick={() => setShowLogout((prev) => !prev)}
      >
        <span className="border-2 font-semibold text-xl border-primary-400 grid place-items-center rounded-full w-[40px] h-[40px]">
          I
        </span>
      </button>
    </header>
  );
}
