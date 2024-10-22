"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="mt-10 flex flex-col items-center gap-2">
      <span>Sorry, not found</span>
      <button
        onClick={() => router.back()}
        className="border py-3  px-7 border-primary-400 rounded-lg font-semibold text-sm leading-6 bg-transparent hover:shadow-custom duration-300"
      >
        Go Back
      </button>
    </div>
  );
}
