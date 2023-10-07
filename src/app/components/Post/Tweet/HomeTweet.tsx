import ImageWithFallback from "@/components/ImageWithFallback";
import { SingleTweetType } from "@/types/api";
import Link from "next/link";
import React, { FC } from "react";
import TweetHeader from "../PostHeader";
import PublishedTime from "../PublishedTime";
import { QueryKey } from "@tanstack/react-query";
import DeleteUnique from "./Actions/DeleteUnique";
import LikesList from "./LikesList";
import LikeUnique from "./Actions/LikeUnique";

type HomeTweetProps = {
  data: SingleTweetType;
  queryKey: QueryKey;
};
const HomeTweet: FC<HomeTweetProps> = ({
  data: {
    id,
    body,
    likes,
    ownerId,
    updatedAt,
    _count: { likes: _likes, comments: _comments },
    owner: { image, name, userName },
  },
  queryKey,
}) => {
  const userHref = `/${userName}`;

  return (
    <>
      <article
        className={
          "items-start gap-4 hover:bg-slate-700 border-b border-slate-500 block hover:bg-transparent cursor-default p-4 border-none"
        }
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-start gap-4 mb-4"
        >
          <Link href={userHref}>
            <ImageWithFallback
              alt="image profile"
              src={image}
              width={40}
              height={40}
              className="rounded-full hover:scale-110"
            />
          </Link>
          <TweetHeader
            name={name}
            userHref={userHref}
            userName={userName}
          />
          <DeleteUnique
            ownerId={ownerId}
            tweetId={id}
            queryKey={queryKey}
          />
        </div>
        <p className="whitespace-pre">{body}</p>
        <div className="mt-8 sm:mt-12 pb-4">
          <time dateTime={String(new Date(updatedAt))}>
            <PublishedTime date={updatedAt} />
          </time>
        </div>
        <div
          className="border-t border-slate-500 pt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <LikesList
            tweetId={id}
            likes={likes}
          />
        </div>
        <div
          className={
            "flex items-center gap-8 mt-4 justify-center border-y border-slate-500 py-2"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <LikeUnique
            likes={likes}
            mutationKey={queryKey}
            tweetId={id}
          />
          <p>COMMENT</p>
        </div>
      </article>
    </>
  );
};

export default HomeTweet;
