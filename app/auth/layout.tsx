import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import SwitchButtons from "../_components/SwitchButtons";
import AuthHeader from "../_components/AuthHeader";
import AuthForm from "../_components/AuthForm";
import { AuthProvider } from "../_hooks/AuthFormContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="bg-custom-radial w-full h-[100vh] text-primary-400 bg-[length:16px_16px]">
      <main className="grid place-items-center">
        <div className="bg-secondary-400 py-7 px-9 flex flex-col justify-center items-center  box-border  w-full vsm:w-[450px]  border my-3 border-1 border-grey-200 rounded">
          <Link href="/">
            <Image
              src="/lt2.svg"
              alt="taskyly-booking"
              width={170}
              height={100}
            />
          </Link>
          <AuthProvider>
            <AuthHeader />
            <SwitchButtons />
            <AuthForm />

            {children}
          </AuthProvider>
        </div>
      </main>
    </section>
  );
}
