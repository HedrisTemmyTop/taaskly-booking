"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IVerification {
  data: {
    data: { userId: string };
    message: string;
    success: boolean;
  };
  pending?: boolean;
  success?: string;
  err?: string
}

export default function Verification({
  data,
  pending,
  err,
  success,
}: IVerification) {
  const router = useRouter();
  // const { pending } = useFormStatus(); // Track form state

  useEffect(() => {
    if (data.success) {
      setTimeout(() => {
        router.push("/dashboard/booking-types");
      }, 2000); // Redirect on success
    }
  }, [data.success, router]);

  return (
    <>
      <div
        className={`${
          data.success || success ? "text-green-400" : "text-red-400"
        }`}
      >
        {success || data.message || err}
      </div>

      {!data.success &&
        data.message !== "An unexpected error occurred" &&
        data.message !== "Invalid token pls register" && (
          <button
            className="text-secondary-400 px-6 py-3 rounded-md disabled:bg-grey-300 disabled:cursor-not-allowed bg-primary-400"
            disabled={pending}
          >
            {pending ? "Sending ..." : "Try again"}
          </button>
        )}
    </>
  );
}
