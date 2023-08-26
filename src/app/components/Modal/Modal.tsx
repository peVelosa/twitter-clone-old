"use client";

import { useEffect, useCallback } from "react";

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

  return isOpen ? (
    <div className="fixed z-20 isolate inset-0">
      <div
        className="absolute inset-0 bg-black bg-opacity-20"
        onClick={close}
      >
        <div
          className="m-4"
          onClick={stopPropagation}
        >
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
