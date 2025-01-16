import LoginForm from "@/app/_components/LoginForm";
export const metadata = {
  title: "Login",
  description: "Taaskly bookings login",
};
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
    return <LoginForm countries={countries} />;
  } catch (error) {
    // You might want to render an error component instead
    console.error("Error fetching countries:", error);
    return <LoginForm countries={[]} />;
  }
}
