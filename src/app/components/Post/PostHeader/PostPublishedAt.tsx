import useUpdateTime from "app/hook/useUpdateTime";
import type { FC } from "react";

type PostPublishedAtProps = {
  publishedAt: Date;
};

const PostPublishedAt: FC<PostPublishedAtProps> = ({ publishedAt }) => {
  const { publishedAt: time } = useUpdateTime({ lastUpdate: publishedAt });

  return (
    <>
      <div className="flex items-center justify-center gap-2 text-white/70">
        ·<span className="text-sm sm:text-base">{time} ago</span>
      </div>
    </>
  );
};

export default PostPublishedAt;
