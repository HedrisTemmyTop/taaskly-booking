import Price from "@/app/_icons/Price";
import { getUserActiveBookingTypes } from "@/app/_lib/bookingType";
import { getUser } from "@/app/_lib/data-service";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { IoTimeOutline } from "react-icons/io5";

export default async function Page({ params }) {
  const email = decodeURIComponent(params.userEmail);
  const user = await getUser(email);
  if (!user) notFound();
  const bookingTypes = await getUserActiveBookingTypes(user.id);
  return (
    <div className="text-primary-400 bg-[#f4f7fa] w-full min-h-[100vh] flex justify-center items-center p-4">
      <div className="flex flex-col gap-4  items-center">
        <div className="w-[96px] h-[96px]  ">
          <Image
            src={user.image || "/filler.svg"}
            width={100}
            height={100}
            alt="profile image"
            className="rounded-full object-cover w-full h-full border border-[#737882c9]"
          />
        </div>
        <div className="text-3xl font-semibold">{user.name}</div>
        <div className="text-sm">{user.bio}</div>

        {bookingTypes.map((type, index) => (
          <Fragment key={type._id as string}>
            <Link
              href={`/${email}/${type.slug}`}
              className="flex flex-col gap-4"
              target="_blank"
            >
              <div
                className={`border border-[#737882c9] rounded p-4 w-[100%] flex justify-between ${
                  index === bookingTypes.length - 1 ? "mb-20" : ""
                }`}
              >
                <div className="">
                  <div className="text-sm m-0 font-semibold">{type.name} </div>
                  <div className="text-sm my-1 break-all sm:my-2">
                    {type.description}
                  </div>
                  <div className="flex">
                    {" "}
                    <span className="bg-[#eaebec99] p-1 items-center  flex rounded-sm text-xs">
                      <IoTimeOutline />
                      <span className="ml-1">{type.duration}m</span>
                    </span>
                    <span className="bg-[#eaebec99] p-1 items-center  flex rounded-sm text-xs ml-4">
                      <span className="flex items-center">
                        <Price />
                        <span className="ml-1">
                          {" "}
                          {type.price > 0
                            ? ` ₦${type.price.toLocaleString("en-US")}`
                            : "Free"}
                        </span>
                      </span>
                    </span>
                  </div>{" "}
                </div>
              </div>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
