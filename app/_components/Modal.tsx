import { useEffect } from "react";
import { FaRegCheckCircle, FaTimes } from "react-icons/fa";

interface IModal {
  type: "success" | "fail";
  message: string;
  showModal?: boolean;
  handleCancel: () => void;
}
export default function Modal({
  type,
  message,
  showModal,
  handleCancel,
}: IModal) {
  useEffect(() => {
    setTimeout(() => {
      handleCancel();
    }, 3000);
  }, [type, message, handleCancel, showModal]);
  const border = type == "success" ? "border-green-800" : "border-red-500";
  return (
    <div
      className={` z-10 duration-1000 fixed max-w-[500px]  bg-secondary-400  top-4 right-2 `}
    >
      <div
        className={`flex relative py-6 pl-4 shadow-lg  pr-14 rounded-lg items-center border-2 ${border} `}
      >
        {" "}
        <span className="text-xl font-extrabold cursor-pointer">
          {type === "success" ? (
            <FaRegCheckCircle className="text-green-800" />
          ) : (
            <FaTimes className="text-red-700" />
          )}
        </span>
        <span className="ml-2"> {message}</span>
        <span
          className={`${
            type === "success" ? "text-green-800" : "text-red-700"
          } text-xs cursor-pointer grid place-items-center absolute top-2 border-2 rounded-full w-[18px] h-[18px]  right-2 ${border}`}
          onClick={handleCancel}
        >
          <FaTimes />
        </span>
      </div>
    </div>
  );
}
