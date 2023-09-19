"use client";

import { useEffect, useCallback } from "react";
import { FaTimes, FaArrowLeft } from "react-icons/fa";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, close, children }: ModalProps) => {
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    },
    [close],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  return isOpen
    ? createPortal(
        <div className="fixed z-20 isolate inset-0">
          <div
            className="absolute inset-0 bg-black bg-opacity-20"
            onClick={close}
          >
            <div
              className="bg-slate-700 min-h-44 mx-auto sm:mt-44 p-4 rounded-md sm:max-w-xl w-full h-full sm:h-fit"
              onClick={stopPropagation}
            >
              <button
                className="p-2 hover:bg-slate-200/40 rounded-full mb-4"
                onClick={close}
              >
                {window.innerWidth > 640 ? (
                  <FaTimes className="fill-white" />
                ) : (
                  <FaArrowLeft className="fill-white" />
                )}
              </button>
              {children}
            </div>
          </div>
        </div>,
        // document.getElementById("modal")!,
        document.body,
      )
    : null;
};

export default Modal;
