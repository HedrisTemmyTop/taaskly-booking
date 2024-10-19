// "use client";

// import React, { useEffect, useState } from "react";
// import AuthForm from "@/app/_components/AuthForm";
// import Modal from "@/app/_components/Modal";
// import { loginAction, signInAction } from "@/app/_lib/actions";
// import { signIn } from "next-auth/react";
// import {
//   redirect,
//   usePathname,
//   useRouter,
//   useSearchParams,
// } from "next/navigation";

// export default function Page() {
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const [modal, setModal] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const path = usePathname();
//   console.log(path);
//   const urlParams = useSearchParams();
//   const loginError = urlParams.get("error");
//   console.log(urlParams, loginError);
//   console.log("hello world");
//   useEffect(() => {
//     if (loginError) {
//       setError(loginError);
//     }
//   }, [loginError]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const authMethod = formData.get("authMethod") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     console.log("authMethod", authMethod);

//     if (authMethod === "credentials") {
//       const result = await signIn("credentials", {
//         email,
//         password,
//       });
//       // console.error(result, "result");

//       if (result?.error) {
//         setModal(true);
//         console.error(error);
//         setError(result?.error);
//       }
//       if (!result?.error) {
//         // setIsLoggedIn(true);
//         console.log("no error");
//         // router.push("/booking-types");
//         window.location.href = "/booking-types"; // Change this to your redirect URL
//       }
//     } else {
//       const result = await signIn("google", {
//         redirectTo: "/booking-types",
//       });
//       if (result?.error) {
//         setModal(true);
//         console.error(error);
//         setError(result?.error);
//       } else {
//         setIsLoggedIn(true);
//         redirect("/booking-types");
//         // window.location.href = "/booking-types"; // Change this to your redirect URL
//       }
//     }
//   };
//   return (
//     <form className="form mt-1.5 w-[100%]" onSubmit={handleSubmit}>
//       <input type="hidden" name="redirectTo" value="/booking-types" />
//       {/* {modal && <Modal showModal={modal} message={error} type={"fail"} />} */}
//       {(error || loginError) && (
//         <div className="text-red-500 grid place-items-center">
//           {error || loginError}
//         </div>
//       )}

//       <AuthForm page={"login"} />
//     </form>
//   );
// }

import AuthForm from "@/app/_components/AuthForm";
import { signInAction } from "@/app/_lib/actions";

export default async function Page() {
  return (
    <form className="form mt-1.5 w-[100%]" action={signInAction}>
      {/* <input type="hidden" name="redirectTo" value="/booking-types" /> */}
      {/* {modal && <Modal showModal={modal} message={error} type={"fail"} />} */}

      <AuthForm page={"login"} />
    </form>
  );
}
