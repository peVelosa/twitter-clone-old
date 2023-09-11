import Link from "next/link";
import TweetDelete from "./Actions/TweetDelete";
import type { FC } from "react";

type TweetHeaderProps = {
  userName: string;
  name: string;
  ownerId: string;
  tweetId: string;
  publishedAt?: string;
};

const TweetHeader: FC<TweetHeaderProps> = ({
  userName,
  name,
  ownerId,
  tweetId,
  publishedAt,
}) => {
  return (
    <>
      <div className="flex gap-1 sm:gap-4 items-center">
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
            {publishedAt && (
              <div className="flex items-center justify-center gap-2 text-white/70">
                ·<span className="text-sm sm:text-base">{publishedAt} ago</span>
              </div>
            )}
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
