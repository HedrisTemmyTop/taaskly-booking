"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { sidebarLinks } from "../_data/sidebarLinks";
import { useBookingTypeContext } from "../_hooks/BookinTypesCtx";
import Modal from "./Modal";
import ShadowBtn from "./ShadowBtn";
import Spinner from "./Spinner";
import { ErrorResponse } from "../_types/user";
import { createBookingType, editBookingType } from "../_lib/bookinType";
import getActiveRoute from "../_utils/getActiveRoute";
import BackDrop from "./BackDrop";

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { name, description, isPublic, id, price, duration, availability } =
    useBookingTypeContext();

  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  const currentHead = useMemo(
    () =>
      sidebarLinks.find(
        (link) =>
          `/dashboard/${link.link.toLowerCase().replace(" ", "-")}` === pathname
      ),
    [pathname]
  );

  const activeRoute = useMemo(() => getActiveRoute(pathname), [pathname]);

  const handleSubmit = async () => {
    try {
      setErr("");
      setLoading(true);

      const data = {
        name,
        description,
        public: isPublic,
        price: price || 0,
        duration: duration || 0,
        availability,
      };
      if (Object.values(data).some((value) => !value)) return; // Check for empty fields
      if (data.price < 0 || data.duration < 0) return;
      const result =
        activeRoute?.button === "create"
          ? await createBookingType(data)
          : await editBookingType(id, data);

      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => router.push("/dashboard/booking-types"), 250);
      }
    } catch (error) {
      const e = error as ErrorResponse;
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = () => {
    if (activeRoute) {
      return (
        <ShadowBtn handleClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner /> : activeRoute.button}
        </ShadowBtn>
      );
    }

    if (currentHead?.button) {
      return (
        <ShadowBtn handleClick={() => router.push(`${pathname}/create`)}>
          {currentHead.button}
        </ShadowBtn>
      );
    }

    return null;
  };

  return (
    <header
      className="flex w-full z-10 fixed flex-1 justify-between 
      md:w-[calc(100%-40px)] 2xl:min-w-[calc(100%-30rem)] lg:min-w-[calc(100%-15rem)] 
      lg:w-[calc(100%-20%)] right-0 items-center px-4 py-4 bg-secondary-400 
      text-primary-400 border-b border-b-1 border-grey-250"
    >
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
          {activeRoute ? activeRoute.link : currentHead?.link}
        </h2>
        <span className="text-sm">
          {activeRoute ? activeRoute.headText : currentHead?.headText}
        </span>
      </div>

      <div className="block">{renderButton()}</div>

      <button
        className={`bg-transparent ${
          currentHead?.button || activeRoute?.button ? "hidden" : ""
        }  
        text-inherit flex md:hidden justify-between items-center gap-2`}
      >
        <span
          className="border-2 font-semibold text-xl border-primary-400 
          grid place-items-center rounded-full w-[40px] h-[40px]"
        >
          I
        </span>
      </button>
    </header>
  );
}
