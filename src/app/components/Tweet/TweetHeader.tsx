import Link from "next/link";
import TweetDelete from "./Actions/TweetDelete";
import type { FC } from "react";

type TweetHeaderProps = {
  userName: string;
  name: string;
  ownerId: string;
  tweetId: string;
  updatedAt: string;
};

const TweetHeader: FC<TweetHeaderProps> = ({
  userName,
  name,
  ownerId,
  tweetId,
  updatedAt,
}) => {
  return (
    <>
      <div className="flex gap-1 sm:gap-4 items-center mb-4">
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
            <div className="flex items-center justify-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span className="text-white/70 text-sm sm:text-base">
                {updatedAt} ago
              </span>
            </div>
          </div>
        </div>
        <TweetDelete
          ownerId={ownerId}
          tweetId={tweetId}
        />
      </div>
    </>
  );
};

export default TweetHeader;
