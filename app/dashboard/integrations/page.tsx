import React from "react";
import Google from "../../_icons/Google";

export default function Page() {
  return (
    <div className="grid grid-cols-1">
      <div className="border border-primary-400 rounded-lg p-4 w-[100%] max-w-[378px] flex justify-between">
        <div className="flex items-center gap-4">
          <Google />
          <span className="font-medium">Google calendar</span>
        </div>
        <button className="border px-4 rounded border-1  border-primary-400 font-medium">
          Connect
        </button>
      </div>
    </div>
  );
}
