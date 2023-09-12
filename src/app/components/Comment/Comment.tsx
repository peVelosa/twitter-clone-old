import ImageWithFallback from "../ImageWithFallback";

import useCountdown from "app/hook/useUpdateTime";
import Link from "next/link";
import CommentHeader from "./CommentHeader";
import type { FC } from "react";
import type { CommentType } from "@/types/api";
import { useRouter } from "next/navigation";

type CommentProps = {
  comment: CommentType;
};

const Comment: FC<CommentProps> = ({ comment }) => {
  const isUser = comment.likes.some((user) => "" === user.id);
  const { publishedAt } = useCountdown({ updatedAt: comment.updatedAt });
  const router = useRouter();

  const {
    id: commentId,
    body,
    likes,
    ownerId,
    owner: { image, name, userName },
    tweetId,
  } = comment;

  return (
    <>
      <article
        className="p-4 flex items-start gap-4 hover:bg-slate-700 cursor-pointer border-b border-slate-500"
        onClick={() => {
          router.push(`/comment/${commentId}`);
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="shrink-0"
        >
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
        <div className="w-full">
          <CommentHeader
            name={name}
            userName={userName}
            ownerId={ownerId}
            tweetId={tweetId}
            commentId={commentId}
            publishedAt={publishedAt}
          />
          <p className="whitespace-pre">{body}</p>
          <div className="flex items-center gap-4 mt-4">
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
