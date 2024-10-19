import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "../_lib/auth";

type LinkType = {
  link: string;
  text: string;
  id: number;
};

const HomeLinks: LinkType[] = [
  { id: 1, link: "/privacy", text: "Privacy" },
  { id: 2, link: "/terms", text: "Terms of service" },
];

export default async function HomeHeader() {
  const session = await auth();
  console.log(session);
  return (
    <header>
      <nav className="flex justify-between items-center flex-wrap">
        <Link href="/" className="order-1">
          <Image alt="taakly" src="/lt.svg" width={150} height={100} />
        </Link>
        <ul className="text-primary-400 flex order-3 self-center md:order-2 min-w-full md:max-w-[300px] md:min-w-[100px]  whitespace-nowrap flex-shrink-0 justify-evenly md:mt-0 mt-5 md:basis-1/3 basis-1/4">
          {HomeLinks.map((item: LinkType) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className="text-inherit underline sm:mx-0 mx-2"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`/dashboard/booking-types`}
          className="border border-primary-400 order-2 md:order-3 px-10 text-4 text-primary-400 rounded-lg py-4 hover:shadow-custom transition-all"
        >
          {session?.user ? "Dashboard" : "Login"}
        </Link>
      </nav>
    </header>
  );
}
