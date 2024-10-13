import React from "react";

export default function LogoutButton() {
  return (
    <button className="absolute border-1 border border-primary-400 py-2.5 px-3 min-h-[60px] bottom-20 rounded-md  w-[150px] shadow-shadowlg">
      <span className="hover:bg-grey-250 transition-all text-red-400 w-full block h-full py-2 rounded">
        Log out
      </span>
    </button>
  );
}
