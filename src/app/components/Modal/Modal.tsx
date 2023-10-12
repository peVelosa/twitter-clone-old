"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { FaTimes, FaArrowLeft } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { createPortal } from "react-dom";

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
  const modalRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const [hasLoadedComponent, setHasLoadedComponent] = useState(false);

  isOpen
    ? (document.body.style.overflowY = "hidden")
    : (document.body.style.overflowY = "auto");

  const closeModal = useCallback(() => {
    router.replace(`${pathName}?${urlParam}=n`);
    if (!onClose) return;
    onClose();
  }, [onClose, router, pathName, urlParam]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal],
  );

  const handleTabKeyPress = useCallback(
    (
      event: KeyboardEvent,
      firstElement: HTMLElement,
      lastElement: HTMLElement,
    ) => {
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [],
  );

  useEffect(() => {
    setHasLoadedComponent(true);
  }, []),
    useEffect(() => {
      if (!modalRef.current) return;

      const modalElement = modalRef.current;
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      window.addEventListener("keydown", handleEscape);
      modalElement.addEventListener("keydown", (e) =>
        handleTabKeyPress(e, firstElement, lastElement),
      );

      return () => {
        window.removeEventListener("keydown", handleEscape);
        modalElement.removeEventListener("keydown", () => handleTabKeyPress);
      };
    }, [isOpen, handleEscape, handleTabKeyPress]);

  const modalTarget = document.getElementById("modal");
  if (!hasLoadedComponent) return <></>;

  return createPortal(
    <>
      {isOpen ? (
        <div
          ref={modalRef}
          className="absolute z-10 inset-0"
          onClick={closeModal}
        >
          <div
            className={twMerge(
              "bg-slate-700 md:left-1/2 md:top-[20%] md:w-fit relative md:-translate-x-1/2 w-full h-full md:h-fit p-6 z-30",
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              className="p-2 hover:bg-slate-200/40 rounded-full mb-4 w-fit block"
              href={`${pathName}?${urlParam}=n`}
            >
              <FaTimes className="fill-white hidden md:block" />
              <FaArrowLeft className="fill-white md:hidden" />
            </Link>
            {children}
          </div>
          <div className="absolute inset-0 bg-black/30 z-20"></div>
        </div>
      ) : null}
    </>,
    modalTarget!,
  );
};

export default Modal;
