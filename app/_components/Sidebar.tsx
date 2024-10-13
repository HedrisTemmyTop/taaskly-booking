import Image from "next/image";

import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";
import SidebarLinks from "./SidebarLinks";

export default function Sidebar() {
  return (
    <aside
      className="text-primary-400 basis-1/5 lg:max-w-[15rem] 2xl:max-w-[30rem] 
    lg:w-[20%] max-w-14  border-r border-r-1  border-primary-400 
    relative h-[100vh]  hidden md:flex flex-col  py-8
     items-center"
    >
      <Image
        src="/lt.svg"
        alt="taaskly-booking-logo"
        width={120}
        height={100}
        className="self-start ml-6 hidden lg:block"
      />
      <Image
        src="/og.png"
        alt="taaskly-booking-logo"
        width={40}
        height={40}
        className="self-start mx-auto block mb-4 lg:hidden "
      />
      <nav className="w-full flex justify-center mt-6">
        <SidebarLinks />

        <ProfileButton>
          <LogoutButton />
        </ProfileButton>
      </nav>
    </aside>
  );
}
