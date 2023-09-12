import type { FC } from "react";

type PostHeaderRootProps = {
  children: React.ReactNode;
};

const PostHeaderRoot: FC<PostHeaderRootProps> = ({ children }) => {
  return <div className="flex gap-1 sm:gap-4 items-center">{children}</div>;
};

export default PostHeaderRoot;
