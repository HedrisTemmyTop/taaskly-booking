"use client";
import { useAuthContext } from "../_hooks/AuthFormContext";

export default function SwitchButtons() {
  const { setState, state } = useAuthContext();
  return (
    <div className="flex self-baseline mb-6">
      <button
        className={`${
          state === "email"
            ? "bg-grey-200 rounded-md text-primary-400 "
            : "text-gray-300"
        } py-2  px-3.5 text-sm transition-all font-medium`}
        onClick={() => setState("email")}
      >
        Email address
      </button>
      <button
        className={`${
          state === "number"
            ? "bg-grey-200 rounded-md text-primary-400"
            : "text-gray-300"
        } py-2  px-3.5 text-sm ml-2 transition-all font-medium`}
        onClick={() => setState("number")}
      >
        Phone number
      </button>
    </div>
  );
}
