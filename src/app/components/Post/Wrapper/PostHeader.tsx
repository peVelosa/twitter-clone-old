import type { FC } from "react";

type PostHeaderProps = {
  children: React.ReactNode;
};

const PostHeader: FC<PostHeaderProps> = ({ children }) => {
  return (
    <>
      <div className="flex gap-1 sm:gap-2 items-center">{children}</div>
    </>
  );
};

export default PostHeader;
