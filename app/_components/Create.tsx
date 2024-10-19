"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Create() {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = function () {
    router.push(`${pathname}/create`);
  };

  return (
    <button
      className="text-4xl fixed bottom-24 block md:hidden right-10 text-secondary-400 bg-primary-400 w-[60px] h-[60px] rounded-full"
      onClick={handleClick}
    >
      +
    </button>
  );
}
