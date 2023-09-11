import Link from "next/link";
import LikeButton from "../Actions/LikeButton";
import CommentButton from "../Actions/CommentButton";
import SpecificTime from "../../SpecificTime";
import HomeTweetHeader from "./HomeTweetHeader";
import type { FC } from "react";
import type { SingleTweetType } from "@/types/api";
import LikesList from "./LikesList";

type TweetProps = {
  tweet: SingleTweetType;
  userId: string;
};

const HomeTweet: FC<TweetProps> = ({ tweet, userId }) => {
  const isUser = tweet.likes.some((user) => userId === user.id);

  const {
    owner: { image, name, userName },
    id: tweetId,
    ownerId,
  } = tweet;

  return (
    <>
      <article className="p-4 pb-2">
        <HomeTweetHeader
          image={image}
          name={name}
          ownerId={ownerId}
          tweetId={tweetId}
          userName={userName}
        />
        <p className="whitespace-pre mt-4">{tweet.body}</p>
        <div className="mt-8 sm:mt-12 pb-4">
          <time dateTime={String(new Date(tweet.updatedAt))}>
            <SpecificTime date={tweet.updatedAt} />
          </time>
        </div>
        <div className="border-t border-slate-500 pt-4">
          <LikesList
            tweetId={tweetId}
            likes={tweet.likes}
          />
        </div>
        <div className="flex items-center gap-8 mt-4 justify-center border-y border-slate-500 pt-2">
          <LikeButton
            isUser={isUser}
            tweetId={tweetId}
            userId={userId}
            mutationKey={["tweets", tweetId]}
          />
          <CommentButton />
        </div>
      </article>
    </>
  );
};

export default HomeTweet;
