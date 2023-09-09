import Link from "next/link";
import TweetDelete from "./Actions/TweetDelete";
import type { FC } from "react";

type TweetHeaderProps = {
  userName: string;
  name: string;
  ownerId: string;
  tweetId: string;
};

const TweetHeader: FC<TweetHeaderProps> = ({
  userName,
  name,
  ownerId,
  tweetId,
}) => {
  return (
    <>
      <div className="flex gap-1 sm:gap-4 items-start">
        <Link
          href={`/${userName}`}
          onClick={(e) => e.stopPropagation()}
          className="max-w-[8ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis"
        >
          <span className="font-bold hover:underline">{name}</span>
        </Link>
        <Link
          href={`/${userName}`}
          onClick={(e) => e.stopPropagation()}
          className="max-w-[8ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis"
        >
          <span className="text-white/70">@{userName}</span>
        </Link>
        <TweetDelete
          ownerId={ownerId}
          tweetId={tweetId}
        />
      </div>
    </>
  );
};

export default TweetHeader;
