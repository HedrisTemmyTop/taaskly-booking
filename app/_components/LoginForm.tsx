"use client";

import AuthForm from "@/app/_components/AuthForm";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signInAction } from "../_lib/actions";
import { loginAction } from "../_lib/data-service";
import { ErrorResponse } from "../_types/user";

export default function LoginForm({ countries }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState("oauth");

  const urlParams = useSearchParams();
  const loginError = urlParams.get("error");
  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      if (authMethod === "oauth") {
        await signInAction();
      } else {
        await loginAction(formData);
      }
    } catch (err) {
      const error = err as ErrorResponse;
      //   setSuccess(false);
      setError(error.message); // Set error message in state
      // }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form mt-1.5 w-[100%]" onSubmit={handleSubmit}>
      {/* {modal && <Modal showModal={modal} message={error} type={"fail"} />} */}

      {error && (
        <div className="text-red-500 grid place-items-center">{error}</div>
      )}

      <AuthForm
        page={"login"}
        setAuthMethod={setAuthMethod}
        countries={countries}
        isLoading={isLoading}
      />
    </form>
  );
}
// import AuthForm from "@/app/_components/AuthForm";
// import { signInAction } from "@/app/_lib/actions";
// export const metadata = {
//   title: "Login",
//   description: "Taaskly bookings login",
// };
// export default function Page() {
//   return (
//     <form className="form mt-1.5 w-[100%]" action={signInAction}>
//       {/* <input type="hidden" name="redirectTo" value="/booking-types" /> */}
//       {/* {modal && <Modal showModal={modal} message={error} type={"fail"} />} */}

//       <AuthForm page={"login"} />
//     </form>
//   );
// }
