import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

export default function Page() {
  return (
    <div className="grid grid-cols-1">
      <div className="border border-primary-400 rounded-lg p-4 w-[100%] flex justify-between">
        <div className="w-[90%]">
          <h2 className="font-medium text-xl mb-4">Working Hours</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-0 mb-2">
            <span className="font-medium">Monday</span>
            <span className="">8:00 AM - 5:00 PM</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-0 mb-2">
            <span className="font-medium">Tuesday</span>
            <span className="">8:00 AM - 5:00 PM</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-0 mb-2">
            <span className="font-medium">Wednesday</span>
            <span className="">8:00 AM - 5:00 PM</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-0 mb-2">
            <span className="font-medium">Thursday</span>
            <span className="">8:00 AM - 5:00 PM</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-0 mb-2">
            <span className="font-medium">Friday</span>
            <span className="">8:00 AM - 5:00 PM</span>
          </div>
        </div>
        <div className="flex">
          <FiEdit className="text-2xl" />
          <AiOutlineDelete className="text-2xl text-red-500 ml-2" />
        </div>
      </div>
    </div>
  );
}
