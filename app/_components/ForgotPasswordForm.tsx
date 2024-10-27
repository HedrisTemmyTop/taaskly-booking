"use client";

import Link from "next/link";
import { useState } from "react";
import { ErrorResponse } from "../_types/user";
import validateEmail from "../_utils/validateEmail";
import Button from "./Button";
import ReusableInput from "./ReusableInput";
import Spinner from "./Spinner";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const isFormReady = validateEmail(email);

  const handleSubmit = async function (e) {
    e.preventDefault();
    setErr("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setSuccess(data.message);
      } else {
        setErr(data.message);
      }
    } catch (err) {
      const error = err as ErrorResponse;
      console.error(err);
      setErr(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {success && (
        <div className="text-green-500 grid place-items-center">{success}</div>
      )}
      {err && <div className="text-red-500 grid place-items-center">{err}</div>}
      <ReusableInput
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        label="Email Address"
        placeholder="Enter a valid email address"
      />{" "}
      <Button
        style={`border-1 border h-12 rounded transition-all mt-6 border-primary-400 text-primary-400 grid disabled:bg-grey-500 disabled:cursor-not-allowed place-items-center w-[100%]`}
        disabled={loading || !isFormReady}
      >
        {loading ? <Spinner /> : "Continue"}
      </Button>
      <div className="text-sm m-auto grid place-items-center mt-8">
        <div>
          <span> Already have an account?</span>{" "}
          <Link
            href={`/auth/login`}
            className="text-primary-400 underline font-semibold "
          >
            login
          </Link>
        </div>
      </div>
    </form>
  );
}
