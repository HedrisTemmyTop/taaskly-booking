"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function AuthHeader() {
  const pathname = usePathname().split("/")[2];
  const isLogin = pathname === "login";
  const isRegister = pathname === "register";
  const isForgot = pathname === "forgot";

  return (
    <>
      <div className="text-2xl mt-4 mb-2">
        {isLogin ? "Welcome Home" : isRegister ? "Hello stranger" : "Hi there"}
      </div>
      <div className="font-semibold mb-3 text-2xl">
        {isLogin
          ? "Login to your account"
          : isRegister
          ? "Create Your account"
          : isForgot
          ? "Forgot Password"
          : "Reset Password"}
      </div>
    </>
  );
}
