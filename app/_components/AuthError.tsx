// app/auth/error/page.js
"use client";

import { useSearchParams } from "next/navigation";

const AuthError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="error-page text-red-500">
      <h1>Error</h1>
      <p>{decodeURIComponent(error || "An unknown error occurred.")}</p>
    </div>
  );
};

export default AuthError; // Change this to default export
