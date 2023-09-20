"use client";

import { useEffect, useCallback, useRef } from "react";
import { FaTimes, FaArrowLeft } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

type ModalProps = {
  isOpen: boolean;
  urlParam: string;
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  onClose?: () => void;
};

const Modal = ({
  isOpen,
  onClose,
  urlParam,
  className,
  children,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const pathName = usePathname();
  const router = useRouter();

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    router.replace(`${pathName}?${urlParam}=n`);
    if (!onClose) return;
    onClose();
  }, [onClose, router, pathName, urlParam]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDialog();
      }
    },
    [closeDialog],
  );

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  return isOpen ? (
    <dialog
      ref={dialogRef}
      className="fixed z-1/2 -translate-y-1/2 bg-transparent backdrop:bg-black/30 z-10"
      onClick={closeDialog}
    >
      <div
        className={twMerge("bg-slate-700 p-6 rounded-lg w-fit", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          className="p-2 hover:bg-slate-200/40 rounded-full mb-4 w-fit block"
          href={`${pathName}?${urlParam}=n`}
        >
          <FaTimes className="fill-white" />
          {/* 
          {window.innerWidth > 640 ? (
            <FaTimes className="fill-white" />
          ) : (
            <FaArrowLeft className="fill-white" />
          )} */}
        </Link>
        {children}
      </div>
    </dialog>
  ) : null;
};

export default Modal;
