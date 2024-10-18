"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-red-500 text-white  flex justify-center items-center p-4 rounded-md">
      <div>
        {" "}
        <h2 className="text-lg font-bold">Something went wrong!</h2>
        <p className="mt-2">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="mt-4 bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
