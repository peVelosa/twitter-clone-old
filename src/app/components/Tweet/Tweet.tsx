import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageWithFallback from "../ImageWithFallback";
import TweetHeader from "./TweetHeader";
import type { FC } from "react";
import type { TweetType } from "@/types/api";
import LikeButton from "./Actions/LikeButton";
import CommentButton from "./Actions/CommentButton";

type TweetProps = {
  tweet: TweetType;
  userId: string;
};

const Tweet: FC<TweetProps> = ({ tweet, userId }) => {
  const router = useRouter();
  const isUser = tweet.likes.some((user) => userId === user.id);

  return (
    <>
      <div
        className="p-4 flex items-start gap-4 hover:bg-slate-700 cursor-pointer"
        onClick={() => {
          router.push(`/tweet/${tweet.id}`);
        }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Link href={`/${tweet.owner.userName}`}>
            <ImageWithFallback
              alt="image profile"
              src={tweet.owner.image}
              width={40}
              height={40}
              className="rounded-full hover:scale-110"
            />
          </Link>
        </div>
        <div className="w-full">
          <TweetHeader
            name={tweet.owner.name}
            userName={tweet.owner.userName}
            ownerId={tweet.ownerId}
            tweetId={tweet.id}
          />
          <p className="whitespace-pre">{tweet.body}</p>
          <div
            className="flex items-center gap-4 mt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <LikeButton
              isUser={isUser}
              likes={tweet._count.likes}
              tweetId={tweet.id}
              userId={userId}
            />
            <CommentButton comments={tweet._count.comments} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
