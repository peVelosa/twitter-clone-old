import Link from "next/link";
import React from "react";

type TweetHeaderProps = {
  name: string;
  userName: string;
  userHref: string;
};

const TweetHeader = ({ name, userName, userHref }: TweetHeaderProps) => {
  return (
    <>
      <Link
        href={userHref}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[12ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis text-sm sm:text-base"
      >
        <span className="font-bold hover:underline">{name}</span>
      </Link>
      <div className="flex items-start justify-center sm:gap-2 flex-col sm:flex-row">
        <Link
          href={userHref}
          onClick={(e) => e.stopPropagation()}
          className="max-w-[12ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis text-sm sm:text-base"
        >
          <span className="text-white/70">@{userName}</span>
        </Link>
      </div>
    </>
  );
};

export default TweetHeader;
