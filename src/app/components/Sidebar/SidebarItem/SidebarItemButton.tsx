"use client";
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SidebarItemButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SidebarItemButton = ({
  children,
  className,
  ...rest
}: SidebarItemButtonProps) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "flex w-full items-center justify-center gap-2 p-2 lg:px-4",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default SidebarItemButton;
