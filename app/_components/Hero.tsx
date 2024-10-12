import React from "react";
import { IoTimeOutline } from "react-icons/io5";
// Pathway Extreme,sans-serif
import { Pathway_Extreme } from "@next/font/google";

const pathway = Pathway_Extreme({
  subsets: ["latin"], // Specify the subsets you need
  weight: ["400", "500", "600", "700"], // You can specify the weights you want to include
});

import CreateButton from "./CreateButton";
const boxes = [
  { id: 1, minute: 15, amount: "50,000" },
  { id: 2, minute: 30, amount: "70,000" },
  { id: 3, minute: 45, amount: "100,000" },
];

export default function Hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-32 text-primary-400">
      <div>
        <h2
          className={`sm:text-7xl vsm:text-6xl text-5xl font-extrabold leading-[1] ${pathway.className}`}
        >
          Boooking simplified
        </h2>
        <div className="sm:text-2xl vsm:text-xl text-lg my-4">
          Create personalized booking pages, manage appointments effortlessly,
          and get paid seamlessly. Tailored for African entrepreneurs, perfect
          for everyone.
        </div>
        <CreateButton />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-primary-400 w-16 h-16 text-3xl text-secondary-400 rounded-full grid place-items-center font-bold">
          D
        </div>
        <div className="text-lg font-bold">DevHedris</div>
        <div className="my-4  text-center ">
          I am a full stack developer, specialized in building user friendly,
          user engaging and scalable web applications with core skills in NextJS
          MongoDB, Typescript and many more
        </div>
        {boxes.map((box, i) => (
          <div
            className={`border border-primary-400 rounded-lg p-4 w-[100%] ${
              i === 1 ? "my-4" : ""
            }`}
            key={box.id}
          >
            <div className="text-xs font-semibold	">15 minutes meeting</div>
            <div className="text-xs my-1">
              Book a meeting with me for {box.minute} minutes
            </div>
            <div className="flex">
              {" "}
              <span className="bg-accent-400 p-0.5 items-center  flex rounded-sm text-tiny">
                <IoTimeOutline />
                <span>{box.minute}m</span>
              </span>
              <span className="bg-accent-400 p-0.5 items-center  flex rounded-sm text-tiny ml-2">
                <IoTimeOutline />
                <span>₦{box.amount}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
