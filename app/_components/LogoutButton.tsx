import React, { forwardRef, CSSProperties } from "react";
import { signOutAction } from "../_lib/actions";

interface PropTypes {
  style?: CSSProperties;
}

const LogoutButton = forwardRef<HTMLFormElement, PropTypes>(
  ({ style = {} }, ref) => {
    return (
      <form
        className="absolute border-1 border border-primary-400 py-2.5 px-3 min-h-[60px] bottom-20 rounded-md w-[150px] shadow-shadowlg"
        action={signOutAction}
        method="post"
        style={style}
        ref={ref}
      >
        <button
          type="submit"
          className="hover:bg-grey-250 transition-all text-red-400 w-full block h-full py-2 rounded"
        >
          Log out
        </button>
      </form>
    );
  }
);

LogoutButton.displayName = "LogoutButton";

export default LogoutButton;
