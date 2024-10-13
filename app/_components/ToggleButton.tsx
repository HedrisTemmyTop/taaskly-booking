import { TiTimes } from "react-icons/ti";
import Check from "../_icons/Check";

export default function ToggleButton({
  isActive,
  onEnable,
}: {
  isActive: boolean;
  onEnable: () => void;
}) {
  return (
    <button
      className={`${
        isActive ? "bg-primary-400" : "bg-gray-100"
      }  w-[43px] h-[22px] rounded-[15px] shadow px-[1px] py-0 hidden [@media(min-width:820px)]:block transition duration-300 ease-out`}
      onClick={onEnable}
    >
      <span
        className={`  bg-secondary-400 grid place-items-center transition duration-300 ease-out  shadow text-xs text-primary-400
        w-5 h-5 rounded-[100%] ${isActive ? "transform translate-x-full" : ""}`}
      >
        {isActive ? <Check /> : <TiTimes />}
      </span>
    </button>
  );
}
