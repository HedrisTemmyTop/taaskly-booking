import ResetPasswordForm from "@/app/_components/ResetPasswordForm";
import React from "react";

export default async function Page({ params }) {
  const { token } = params;
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/verify-reset-token`,
    {
      method: "POST",
      body: JSON.stringify({ token }),
    }
  );
  const data = await response.json();
  console.log(data);
  if (!data.success)
    return (
      <div className="text-red-500 fixed w-full z-10 bg-secondary-400 grid place-items-center h-full bottom-0 top-0 left-0 right-0 min-h-[100vh]">
        {data.message || "Invalid  reset token"}
      </div>
    );
  // const
  return <ResetPasswordForm userId={data.data} />;
}
