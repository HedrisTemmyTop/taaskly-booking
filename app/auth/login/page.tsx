import { Suspense } from "react";
import LoginForm from "./../../_components/LoginForm";

export default async function Page() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data = await response.json();

  return (
    <Suspense>
      <LoginForm countries={data} />
    </Suspense>
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
