import type { FC } from "react";
import { twMerge } from "tailwind-merge";

type PostActionsRootProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<"article">["className"];
};

const PostActionsRoot: FC<PostActionsRootProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge("flex items-center gap-4 mt-4", className)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default PostActionsRoot;
