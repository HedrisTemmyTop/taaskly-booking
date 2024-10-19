// import { AuthError } from "@/app/_components/AuthError";
// import { AuthError } from "@/app/_components/AuthError";
import React, { Suspense } from "react";
import AuthError from "../../_components/AuthError";

export default function Page() {
  console.log("eerr");
  return (
    <Suspense fallback={<div>Loading</div>}>
      <AuthError />
    </Suspense>
  );
}
