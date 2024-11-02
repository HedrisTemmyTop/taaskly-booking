"use client";

import { useEffect, useState, use } from "react";
import Verification from "@/app/_components/Verification";
import { verifyUserEmail } from "@/app/_lib/actions";

export default function Page(props: { params: Promise<{ token: string }> }) {
  const params = use(props.params);
  const [success, setSuccess] = useState("");
  const [data, setData] = useState<null | {
    success: boolean;
    message: string;
    data: {
      userId: string;
    };
  }>(null); // State to hold verification data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State for error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email/${params.token}`);
        const result = await response.json();

        setData(result); // Set fetched data
      } catch (err) {
        console.error(err);
        setError("Failed to fetch verification data."); // Handle fetch error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Call the fetch function
  }, [params.token]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = data?.data?.userId;
    setLoading(true);

    try {
      if (userId) {
        // Call the verifyUserEmail function with the userId
        const response = await verifyUserEmail(userId);
        if (response.message === "Verification code sent to your mail") {
          setSuccess(response.message);
        }
        // You can handle success/failure here, e.g., redirecting the user or showing a message
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading state or error
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div className="text-red-500">{error}</div>;

  // Render verification data
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col gap-4 justify-center items-center">
      {data?.success ? (
        <Verification data={data} />
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {data && (
            <>
              <Verification
                err={error || ""}
                data={data}
                success={success}
                pending={loading}
              />
            </>
          )}
        </form>
      )}
    </div>
  );
}
