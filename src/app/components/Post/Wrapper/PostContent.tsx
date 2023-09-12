import type { FC } from "react";

type PostContentProps = {
  children: React.ReactNode;
};

const PostContent: FC<PostContentProps> = ({ children }) => {
  return <p className="whitespace-pre">{children}</p>;
};

export default PostContent;
