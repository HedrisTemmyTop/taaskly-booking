import React from "react";
import Cancel from "../_icons/Cancel";
import Spinner from "./Spinner";

interface BackDropProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const BackDrop: React.FC<BackDropProps> = ({
  isOpen,
  message,
  onClose,
  onConfirm,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Modal content */}
      <div className="border-primary-400 border relative z-10 items-center flex flex-col  bg-white rounded-lg shadow-lg p-6 w-[95%] max-w-[470px]">
        <div className="flex w-full justify-between items-center basis-full">
          <h2 className="text-2xl font-semibold">Delete Type</h2>
          <button
            onClick={onClose}
            className="text-black border font-extralight  border-primary-400 rounded text-4xl"
          >
            <Cancel />
          </button>
        </div>

        <p className="mt-6  mb-4 text-center tracking-[0.1rem]">{message}</p>

        <div className="flex gap-4 basis-full w-full justify-between">
          <button
            onClick={onClose}
            className="basis-1/2 w-full h-[46px] hover:bg-[#1f2937] bg-black text-white rounded-lg"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="w-full basis-1/2 h-[46px] bg-red-500 text-white rounded-lg hover:bg-red-700"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackDrop;
