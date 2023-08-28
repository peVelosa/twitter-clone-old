import type { FC } from "react";
import Link, { type LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: React.ComponentProps<"a">["className"];
}

const SidebarItemLink: FC<SidebarItemLinkProps> = ({
  href,
  children,
  className,
  ...rest
}) => {
  return (
    <Link
      href={href}
      {...rest}
      className={twMerge(
        "flex w-full items-center justify-center gap-2 p-2 lg:px-4",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default SidebarItemLink;
