import React, { ReactNode } from "react";
import PhoneNav from "../_components/PhoneNav";
import Sidebar from "../_components/Sidebar";
import DashboardHeader from "../_components/DashboardHeader";
import { BookingTypeProvider } from "../_hooks/BookinTypesCtx";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="flex">
      <PhoneNav />
      <Sidebar />
      <main className="flex-1">
        <BookingTypeProvider>
          <DashboardHeader />
          <div className="p-4 text-primary-400 md:w-[calc(100%-40px)] lg:w-[calc(100%-20%)] w-full 2xl:min-w-[calc(100%-30rem)] lg:min-w-[calc(100%-15rem)] mt-[100px] absolute right-0">
            {" "}
            {children}
          </div>
        </BookingTypeProvider>
      </main>
    </section>
  );
}
