import React, { ReactNode } from "react";
import Cancel from "../_icons/Cancel";
import Spinner from "./Spinner";

interface BackDropProps {
  isOpen: boolean;
  message?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  loading: boolean;
  type?: string;
  children?: ReactNode;
  label?: string;
}

const BackDrop: React.FC<BackDropProps> = ({
  isOpen,
  message = "",
  onClose,
  onConfirm,
  loading,
  type,
  label,
  children,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (onClose) onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick} // Close on clicking outside
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Modal content */}
      <div
        className="border-primary-400 border relative z-10 flex flex-col items-center bg-white rounded-lg shadow-lg p-6 w-[95%] max-w-[470px]"
        onClick={handleContentClick} // Prevent modal content click from propagating
      >
        {children
          ? children
          : type !== "loading" && (
              <>
                <div className="flex w-full justify-between items-center">
                  <h2 className="text-2xl font-semibold">Delete Type</h2>
                  <button
                    onClick={onClose}
                    className="text-black border font-extralight border-primary-400 rounded text-4xl"
                  >
                    <Cancel />
                  </button>
                </div>
                <p className="mt-6 mb-4 text-center tracking-[0.1rem]">
                  {message}
                </p>
                <div className="flex gap-4 w-full justify-between">
                  <button
                    onClick={onClose}
                    className="basis-1/2 h-[46px] w-full hover:bg-[#1f2937] bg-black text-white rounded-lg"
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
              </>
            )}

        {type === "loading" && (
          <>
            <div className="flex w-full justify-between items-center">
              <h2 className="text-2xl font-semibold grid place-items-center w-full">
                {label}
              </h2>
            </div>
            <p className="mt-6 mb-4 text-center tracking-[0.1rem]">{message}</p>
            <div className="flex gap-4 w-full justify-between">
              <button
                onClick={onConfirm}
                className="w-full h-[46px] bg-grey-500 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Yes"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BackDrop;
