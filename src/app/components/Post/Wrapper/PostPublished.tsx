import useUpdateTime from "app/hook/useUpdateTime";
import type { FC } from "react";

type PostPublishedProps = {
  publishedAt: Date;
};

const PostPublished: FC<PostPublishedProps> = ({ publishedAt }) => {
  const { updatedAt } = useUpdateTime({ publishedAt });

  return (
    <>
      <div className="flex items-center justify-center gap-2 text-white/70">
        ·<span className="text-sm sm:text-base">{updatedAt} ago</span>
      </div>
    </>
  );
};

export default PostPublished;
