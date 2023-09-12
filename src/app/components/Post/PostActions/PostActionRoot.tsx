import type { FC } from "react";

type PostActionRootProps = {
  children: React.ReactNode;
};

const PostActionRoot: FC<PostActionRootProps> = ({ children }) => {
  return (
    <div
      className="flex items-center gap-4 mt-4"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default PostActionRoot;
