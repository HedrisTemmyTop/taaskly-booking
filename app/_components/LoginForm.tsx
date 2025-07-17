"use client";

import AuthForm from "@/app/_components/AuthForm";
import React, { useState, useEffect } from "react";
import { signInAction } from "../_lib/actions";
import { loginAction } from "../_lib/data-service";
import { ErrorResponse } from "../_types/user";

export default function LoginForm({ countries }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState("oauth");

  // State to hold the login error
  const [loginError, setLoginError] = useState<string | null>(null);

  // Use useEffect to ensure we're on the client side before accessing window
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get("error");
      if (errorParam) {
        setLoginError(errorParam);
      }
    }
  }, []);

  // Update the error state based on loginError from URL params
  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      if (authMethod === "oauth") {
        await signInAction();
      } else {
        setIsLoading(true);
        await loginAction(formData);
      }
    } catch (err) {
      const error = err as ErrorResponse;
      console.error(err);
      setError(error.message); // Set error message in state
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form mt-1.5 w-[100%]" onSubmit={handleSubmit}>
      {error && (
        <div className="text-red-500 grid place-items-center">{error}</div>
      )}

      <AuthForm
        page={"login"}
        setAuthMethod={setAuthMethod}
        countries={countries}
        isLoading={isLoading}
      />
    </form>
  );
}
