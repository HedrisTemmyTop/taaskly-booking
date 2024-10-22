"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useAuthContext } from "../_hooks/AuthFormContext";
import Button from "./Button";
import PhoneNumberInput from "./PhoneNumberInput";

export default function AuthInput({
  children,
  page,
}: {
  children: ReactNode;
  page: string;
}) {
  const pathname = usePathname().split("/")[2];

  const isLogin = pathname === "login";
  const { state } = useAuthContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<null | number>(null);

  const [fullname, setFullname] = useState("");
  const { pending } = useFormStatus();

  const isFormReady = false;
  // (validateEmail(email) && password.length > 6) || phoneNumber.length >= 8;
  return (
    <>
      {/* {modal && <Modal message={message} type={"fail"} />} */}
      {state === "email" ? (
        <>
          {" "}
          {page === "register" && (
            <div className="flex flex-col w-[100%] mb-4">
              <label htmlFor="email" className="ml-1 mb-1 font-medium">
                Name
              </label>
              <input
                type="text"
                name="fullname"
                className="border-2 outline-0 py-1 px-4 border-primary-400
rounded-lg text-inherit w-[100%] h-12"
                placeholder="Enter your fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          )}
          <input
            type="hidden"
            id="authMethod"
            name="authMethod"
            value={isFormReady ? "credentials" : "oauth"}
          />
          <div className="flex flex-col w-[100%] mb-4">
            <label htmlFor="email" className="ml-1 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="border-2 outline-0 py-1 px-4 border-primary-400
rounded-lg text-inherit w-[100%] h-12"
              placeholder="Enter a valid email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[100%] mb-4">
            <div className="flex justify-between">
              <label htmlFor="password" className="ml-1 mb-1 font-medium">
                Password
              </label>
              <button
                className="text-sm border-0 text-grey-300 underline disabled:cursor-not-allowed"
                disabled={true}
              >
                {isLogin
                  ? "   login with email link"
                  : "register with email link"}
              </button>
            </div>
            <div className="w-[100%] relative">
              <input
                type={`${isPasswordVisible ? "password" : "text"}`}
                name="password"
                className="border-2 outline-0 py-1 px-4 border-primary-400
          rounded-lg text-inherit w-[100%] h-12"
                placeholder="Enter a your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="absolute cursor-pointer border-0 right-2 text-2xl top-1/2 transform -translate-y-1/2"
              >
                <AiOutlineEye />
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="flex">
              <input type="checkbox" name="remember" />
              <label htmlFor="remeber" className="ml-2 font-medium">
                {isLogin ? (
                  "Remember me"
                ) : (
                  <>
                    <span className="text-sm">
                      I consent to our{" "}
                      <Link href="/privacy" className="underline">
                        privacy policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="underline">
                        terms
                      </Link>{" "}
                      of service
                    </span>
                  </>
                )}
              </label>
            </span>
            {isLogin && (
              <span className="text-sm border-0 text-primary-400 underline disabled:cursor-not-allowed">
                Forgot password?
              </span>
            )}
          </div>
        </>
      ) : (
        <>
          <PhoneNumberInput
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          >
            {children}
          </PhoneNumberInput>
        </>
      )}

      <Button
        style={`border-1 border h-12 rounded transition-all mt-4 border-primary-400 text-primary-400 grid disabled:bg-grey-500 disabled:cursor-not-allowed place-items-center w-[100%]`}
        disabled={pending || !isFormReady}
      >
        {state !== "email" && "Send OTP"}
        {state === "email" && "Auth mode is comming soon"}
        {/* {isLogin && state === "email" ? "Login" : "Register"} */}
      </Button>
      <div className="flex items-center my-4 justify-center font-medium relative">
        <span className="before:content-[''] before:block before:bg-primary-400 before:w-[45%] before:h-px before:absolute before:left-0 before:top-1/2 after:content-[''] after:block after:bg-primary-400 after:w-[45%] after:h-px after:absolute after:right-0 after:top-1/2">
          OR
        </span>
      </div>
      <Button
        style={`rounded  text-primary-400 grid h-12 text-secondary-400  bg-primary-400  place-items-center w-[100%]`}
        disabled={pending}
      >
        {isLogin ? "     Continue with google" : "     Sign up with google "}
      </Button>
      <div className="text-sm m-auto grid place-items-center mt-8">
        <div>
          <span>{isLogin ? "Don`t" : "Already"} have an account?</span>{" "}
          <Link
            href={`/auth/${isLogin ? "register" : "login"}`}
            className="text-primary-400 underline font-semibold "
          >
            {isLogin ? "   Sign up" : "login"}
          </Link>
        </div>
      </div>
    </>
  );
}
