import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type SidebarItemRootProps = {
  children: ReactNode;
  className?: React.ComponentProps<"div">["className"];
};

const SidebarItemRoot = ({ children, className }: SidebarItemRootProps) => {
  return (
    <div
      className={twMerge(
        "w-fit overflow-hidden rounded-full hover:bg-gray-600",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SidebarItemRoot;
