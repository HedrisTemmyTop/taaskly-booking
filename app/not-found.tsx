import Image from "next/image";
import Link from "next/link";

// const getSiteData = async function(domain: string){
//     const response = await fetch()
// }

export default async function NotFound() {
  return (
    <div className="w-[100vw] h-[100vh] p-8 flex flex-col items-center justify-between text-primary-400">
      <div className="flex flex-col gap-4 items-center">
        <Image
          src={"/lt.svg"}
          alt="taaskyly-logo"
          className="sm:w-[300px] w-[120px]  vsm:w-[200px] h-20"
          width={100}
          height={100}
        />
        <p className="">404</p>
        <h1 className="text-3xl text-center sm:text-5xl font-semibold">
          This page does not exist
        </h1>
        <p className="sm:leading-8 leading-7 text-center">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="border py-3  px-7 border-primary-400 rounded-lg font-semibold text-sm leading-6 bg-transparent hover:shadow-custom duration-300"
        >
          Go Home
        </Link>
      </div>
      <p className="text-grey-300 text-sm">
        &copy; Taaskly, DevHedris Version. All rights reserved.
      </p>
    </div>
  );
}
