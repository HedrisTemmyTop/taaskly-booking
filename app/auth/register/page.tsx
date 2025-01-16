import RegisterForm from "@/app/_components/RegisterForm";
// // import { signInAction } from "@/app/_lib/actions";
export const metadata = {
  title: "Register",
  description: "Taaskly bookings registeration",
};
// export default async function Page() {
//   // const response = await fetch("https://restcountries.com/v3.1/all");
//   // const data = await response.json();

//   return <RegisterForm countries={[]} />;
// }

// // import AuthForm from "@/app/_components/AuthForm";
// // import { signInAction } from "@/app/_lib/actions";

// // export default function Page() {
// //   return (
// //     <form className="form mt-1.5 w-[100%]" action={signInAction}>
// //       <AuthForm page={"register"} />
// //     </form>
// //   );
// // }

async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all", {
    // Add cache options for better performance
    next: {
      revalidate: 3600, // Revalidate every hour
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
}

export default async function Page() {
  // Use error boundary to handle fetch errors gracefully
  try {
    const countries = await getCountries();
    return <RegisterForm countries={countries} />;
  } catch (error) {
    // You might want to render an error component instead
    console.error("Error fetching countries:", error);
    return <RegisterForm countries={[]} />;
  }
}
