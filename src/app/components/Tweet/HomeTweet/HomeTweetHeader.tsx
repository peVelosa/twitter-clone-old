import ImageWithFallback from "@/components/ImageWithFallback";
import Link from "next/link";
import React, { type FC } from "react";
import TweetHeader from "../TweetHeader";

type HomeTweetHeaderProps = {
  userName: string;
  image: string;
  tweetId: string;
  ownerId: string;
  name: string;
};

const HomeTweetHeader: FC<HomeTweetHeaderProps> = ({
  userName,
  image,
  tweetId,
  ownerId,
  name,
}) => {
  return (
    <>
      <div className="w-full flex items-center gap-4">
        <div className="shrink-0 ">
          <Link href={`/${userName}`}>
            <ImageWithFallback
              alt="image profile"
              src={image}
              width={40}
              height={40}
              className="rounded-full hover:scale-110"
            />
          </Link>
        </div>
        <TweetHeader
          name={name}
          userName={userName}
          ownerId={ownerId}
          tweetId={tweetId}
        />
      </div>
    </>
  );
};

export default HomeTweetHeader;
