import type { FC } from "react";

type PostBodyProps = {
  children: React.ReactNode;
};

const PostBody: FC<PostBodyProps> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export default PostBody;
