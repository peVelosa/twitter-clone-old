import ImageWithFallback from "../ImageWithFallback";
import type { FC } from "react";
import type { CommentType } from "@/types/api";
import { useRouter } from "next/router";
import useCountdown from "app/hook/useCountdown";
import Link from "next/link";
import TweetHeader from "../Tweet/TweetHeader";

type CommentProps = {
  comment: CommentType;
};

const Comment: FC<CommentProps> = ({ comment }) => {
  const isUser = comment.likes.some((user) => "" === user.id);
  const { publishedAt } = useCountdown({ updatedAt: comment.updatedAt });
  return (
    <>
      <article className="p-4 flex items-start gap-4 hover:bg-slate-700 cursor-pointer border-b border-slate-500">
        <div
          onClick={(e) => e.stopPropagation()}
          className="shrink-0"
        >
          <Link href={`/${comment.owner.userName}`}>
            <ImageWithFallback
              alt="image profile"
              src={comment.owner.image}
              width={40}
              height={40}
              className="rounded-full hover:scale-110"
            />
          </Link>
        </div>
        <div className="w-full">
          <TweetHeader
            name={comment.owner.name}
            userName={comment.owner.userName}
            ownerId={comment.ownerId}
            tweetId={comment.id}
            publishedAt={publishedAt}
          />
          <p className="whitespace-pre">{comment.body}</p>
          <div
            className="flex items-center gap-4 mt-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <LikeButton
            isUser={isUser}
            likes={tweet._count.likes}
            tweetId={tweet.id}
            userId={userId}
          />
          <CommentButton comments={tweet._count.comments} /> */}
          </div>
        </div>
      </article>
    </>
  );
};

export default Comment;
