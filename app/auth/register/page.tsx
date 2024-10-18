// "use client";

// import AuthForm from "@/app/_components/AuthForm";
// import { createUser, signInAction } from "@/app/_lib/actions";
// import React, { useState } from "react";

// export default function Page() {
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null); // State for error

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null); // Reset error state before new submission

//     const formData = new FormData(e.currentTarget);
//     const authMethod = formData.get("authMethod") as string;

//     try {
//       if (authMethod === "oauth") {
//         const result = await signInAction();
//         if (result.error) {
//           setError(result.error);
//         }
//       } else {
//         const result = await createUser(formData);
//         console.log(result);
//         if (!result) {
//           setSuccess(true);
//           setError(null);
//         } else {
//           throw new Error(result); // Throwing error if something went wrong
//         }
//       }
//     } catch (err: any) {
//       console.log(err);
//       setSuccess(false);
//       setError(err.message); // Set error message in state
//     }
//   };

//   return (
//     <form className="form mt-1.5 w-[100%]" onSubmit={handleSubmit}>
//       {success && (
//         <div className="text-green-500 grid place-items-center">
//           Verification code has been sent to your mail
//         </div>
//       )}

//       {error && (
//         <div className="text-red-500 grid place-items-center">{error}</div>
//       )}
//       <AuthForm page={"register"} />
//     </form>
//   );
// }

import AuthForm from "@/app/_components/AuthForm";
import { signInAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/dashboard/booking-types");
  return (
    <form className="form mt-1.5 w-[100%]" action={signInAction}>
      <AuthForm page={"register"} />
    </form>
  );
}
