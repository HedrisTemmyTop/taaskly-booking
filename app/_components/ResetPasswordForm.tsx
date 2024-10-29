"use client";
import Link from "next/link";
import { useState } from "react";
import { signOutActionWithPath } from "../_lib/actions";
import { resetPassword } from "../_lib/data-service";
import Button from "./Button";
import ReusableInput from "./ReusableInput";
import Spinner from "./Spinner";

export default function ResetPasswordForm({ userId }) {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const handleSubmit = async function (e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const response = await resetPassword(userId, newPassword);
      setSuccess("Password has been reset");

      setTimeout(() => {}, 500);
      await signOutActionWithPath("/auth/login");
    } catch (err) {
      setErr(err.message || "Something went wrong try again");
    } finally {
      setLoading(false);
    }
  };

  const isFormReady = newPassword.length >= 6;

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {success && (
        <div className="text-green-500 grid place-items-center">{success}</div>
      )}
      {err && <div className="text-red-500 grid place-items-center">{err}</div>}
      <ReusableInput
        value={newPassword}
        name="email"
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        label="New password"
        placeholder="Enter your new password"
      />{" "}
      <Button
        style={`border-1 border h-12 rounded transition-all mt-6 border-primary-400 text-primary-400 grid disabled:bg-grey-500 disabled:cursor-not-allowed place-items-center w-[100%]`}
        disabled={loading || !isFormReady}
      >
        {loading ? <Spinner /> : "Reset"}
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
