"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function AuthHeader() {
  const pathname = usePathname().split("/")[2];
  console.log(pathname);
  const isLogin = pathname === "login";

  return (
    <>
      <div className="text-2xl mt-4 mb-2">
        {isLogin ? "Welcome Home" : "Hello stranger"}
      </div>
      <div className="font-semibold mb-3 text-2xl">
        {isLogin ? "Login to your account" : "Create Your account"}
      </div>
    </>
  );
}
