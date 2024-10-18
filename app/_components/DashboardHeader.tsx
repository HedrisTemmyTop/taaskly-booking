"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { sidebarLinks } from "../_data/sidebarLinks";
import { useBookingTypeContext } from "../_hooks/BookinTypesCtx";
import { createBookingType } from "../_lib/actions";
import Modal from "./Modal";
import ShadowBtn from "./ShadowBtn";
import Spinner from "./Spinner";
import { ErrorResponse } from "../_types/user";

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const {
    name,

    description,
    isPublic,
    availability,
    price,
    duration,
  } = useBookingTypeContext();

  const currentHead = sidebarLinks.find(
    (link) =>
      `/dashboard/${link.link.toLowerCase().replace(" ", "-")}` === pathname
  );
  let activeRouteNotSidebar;
  const handleSubmit = async () => {
    setErr("");
    setLoading(true);
    let data;
    console.log(name, description, isPublic, price, duration, availability);
    try {
      if (pathname === "/dashboard/booking-types/create") {
        data = {
          name,
          description,
          public: isPublic,
          price,
          duration,
          availability,
        };
        if (
          !data ||
          !name ||
          !description ||
          !availability ||
          !duration ||
          !isPublic
        ) {
          return;
        }
        const result = await createBookingType(data);
        console.log(result);
        if (result.success) {
          setSuccess(result.message);

          setTimeout(() => {
            router.push("/dashboard/booking-types");
          }, 1000);
        }
      }
    } catch (error) {
      const e = error as ErrorResponse
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };
  if (pathname === "/dashboard/booking-types/create") {
    activeRouteNotSidebar = {
      id: 10,
      button: "create",
      link: "Create Booking Type",
      headText: "Create a new booking type",
      // fn:
    };
  }
  return (
    <header className="flex w-full z-10 fixed flex-1 justify-between md:w-[calc(100%-40px)] 2xl:min-w-[calc(100%-30rem)] lg:min-w-[calc(100%-15rem)] lg:w-[calc(100%-20%)] right-0 items-center px-4 py-4 bg-secondary-400 text-primary-400 border-b border-b-1 border-grey-250">
      {err && (
        <Modal type="fail" message={err} handleCancel={() => setErr("")} />
      )}
      {success && (
        <Modal
          type="success"
          message={success}
          handleCancel={() => setSuccess("")}
        />
      )}
      <div>
        <h2 className="text-xl font-semibold capitalize">
          {activeRouteNotSidebar
            ? activeRouteNotSidebar.link
            : currentHead?.link}
        </h2>
        <span className="text-sm">
          {activeRouteNotSidebar
            ? activeRouteNotSidebar.headText
            : currentHead?.headText}
        </span>
      </div>
      <div className="block">
        {currentHead?.button && !activeRouteNotSidebar && (
          <ShadowBtn
            handleClick={() => {
              router.push(`${pathname}/create`);
            }}
          >
            {currentHead.button}
          </ShadowBtn>
        )}
        {activeRouteNotSidebar && (
          <ShadowBtn handleClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner /> : activeRouteNotSidebar.button}
          </ShadowBtn>
        )}
      </div>
      <button
        className={`bg-transparent ${
          currentHead?.button || activeRouteNotSidebar?.button ? "hidden" : ""
        }  text-inherit flex md:hidden justify-between items-center gap-2`}
        // onClick={() => setShowLogout((prev) => !prev)}
      >
        <span className="border-2 font-semibold text-xl border-primary-400 grid place-items-center rounded-full w-[40px] h-[40px]">
          I
        </span>
      </button>
    </header>
  );
}
