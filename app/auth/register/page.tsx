import RegisterForm from "@/app/_components/RegisterForm";
// import { signInAction } from "@/app/_lib/actions";
// export const metadata = {
//   title: "Register",
//   description: "Taaskly bookings registeration",
// };
export default async function Page() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  return <RegisterForm countries={data} />;
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
