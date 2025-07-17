"use client";

import AuthForm from "@/app/_components/AuthForm";
import { signInAction } from "@/app/_lib/actions";
// import { signInAction } from "@/app/_lib/actions";
import { createUser } from "@/app/_lib/data-service";
import { ErrorResponse } from "@/app/_types/user";
import React, { useState } from "react";
import Modal from "./Modal";
// export const metadata = {
//   title: "Register",
//   description: "Taaskly bookings registeration",
// };
export default function RegisterForm({ countries }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState("oauth");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      if (authMethod === "oauth") {
        await signInAction();
      } else {
        setIsLoading(true);
        const newUserResponse = await createUser(formData);
        const result = await newUserResponse.json();
        console.log(result, "result");
        if (result.success) {
          setSuccess(true);
          setError(null);
        } else {
          throw new Error(result.message || "Something went wrong"); // Throwing error if something went wrong
        }
      }
    } catch (err) {
      const error = err as ErrorResponse;
      setSuccess(false);
      setError(error.message); // Set error message in state
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form mt-1.5 w-[100%]" onSubmit={handleSubmit}>
      {success && (
        <Modal
          type="success"
          message="Verification code has been sent to your mail"
          handleCancel={() => setSuccess(false)}
        />
      )}

      {error && (
        <div className="text-red-500 grid place-items-center">{error}</div>
      )}
      <AuthForm
        setAuthMethod={setAuthMethod}
        page={"register"}
        isLoading={isLoading}
        countries={countries}
      />
    </form>
  );
}

// import AuthForm from "@/app/_components/AuthForm";
// import { signInAction } from "@/app/_lib/actions";

// export default function Page() {
//   return (
//     <form className="form mt-1.5 w-[100%]" action={signInAction}>
//       <AuthForm page={"register"} />
//     </form>
//   );
// }
