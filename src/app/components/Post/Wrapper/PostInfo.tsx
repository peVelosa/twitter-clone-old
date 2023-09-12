import Link from "next/link";
import type { FC } from "react";

type PostInfoProps = {
  userName: string;
  name: string;
  children?: React.ReactNode;
};

const PostInfo: FC<PostInfoProps> = ({ userName, name, children }) => {
  return (
    <div className="flex gap-1 sm:gap-4 items-start flex-col sm:flex-row">
      <Link
        href={`/${userName}`}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[12ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis text-sm sm:text-base"
      >
        <span className="font-bold hover:underline">{name}</span>
      </Link>
      <div className="flex items-start justify-center sm:gap-2 flex-col sm:flex-row">
        <Link
          href={`/${userName}`}
          onClick={(e) => e.stopPropagation()}
          className="max-w-[12ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis text-sm sm:text-base"
        >
          <span className="text-white/70">@{userName}</span>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default PostInfo;