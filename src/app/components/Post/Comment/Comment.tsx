import Link from "next/link";
import { useRouter } from "next/navigation";
import { CommentType } from "@/types/api";
const NoSRRPublishedAt = dynamic(() => import("../PublishedAt"), {
  ssr: false,
});

import type { FC } from "react";
import type { MutationKey } from "@tanstack/react-query";
import TweetHeader from "../PostHeader";
import Delete from "./Actions/Delete";
import Like from "./Actions/Like";
import dynamic from "next/dynamic";
import ImageWithFallback from "@/components/ImageWithFallback";

type CommentProps = {
  data: CommentType;
  queryKey: MutationKey;
  userId: string;
};

const Comment: FC<CommentProps> = ({
  data: {
    id,
    body,
    likes,
    ownerId,
    updatedAt,
    tweetId,
    owner: { image, name, userName },
  },
  queryKey,
  userId,
}) => {
  const router = useRouter();
  const commentHref = `/comment/${id}`;
  const userHref = `/${userName}`;

  return (
    <>
      <article
        className={
          "p-4 flex items-start gap-4 hover:bg-slate-700 cursor-pointer border-b border-slate-500"
        }
        onClick={() => {
          if (!commentHref) return;
          if (commentHref.includes("prov-id-no-interactivity")) return;
          router.push(commentHref);
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="shrink-0"
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
        </div>
        <div className="w-full">
          <div className="flex gap-1 sm:gap-2 items-center">
            <div className="flex gap-1 sm:gap-4 items-start flex-col sm:flex-row">
              <TweetHeader
                name={name}
                userHref={userHref}
                userName={userName}
              />
              <NoSRRPublishedAt publishedAt={updatedAt} />
              <Delete
                userId={ownerId}
                commentId={id}
                tweetId={tweetId}
                queryKey={queryKey}
              />
            </div>
          </div>
          <p className="whitespace-pre">{body}</p>
          <div
            className={"flex items-center gap-4 mt-4"}
            onClick={(e) => e.stopPropagation()}
          >
            <Like
              commentId={id}
              mutationKey={queryKey}
              likes={likes}
              tweetId={tweetId}
              userId={userId}
            />
            <p>COMMENT</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default Comment;
