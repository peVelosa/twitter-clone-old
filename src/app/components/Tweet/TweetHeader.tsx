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
      <div
        className="flex gap-4 items-start"
        onClick={(e) => e.stopPropagation()}
      >
        <Link href={`/${userName}`}>
          <span className="font-bold hover:underline">{name}</span>
        </Link>
        <Link href={`/${userName}`}>
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
