import Link from "next/link";
import { useRouter } from "next/navigation";
import { TweetType } from "@/types/api";

import Delete from "./Actions/Delete";
import TweetHeader from "../PostHeader";
import Like from "./Actions/Like";
import type { FC } from "react";
import type { MutationKey } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import ImageWithFallback from "@/components/ImageWithFallback";

const NoSRRPublishedAt = dynamic(() => import("../PublishedAt"), {
  ssr: false,
});

type TweetProps = {
  data: TweetType;
  queryKey: MutationKey;
  userId: string;
};

const Tweet: FC<TweetProps> = ({
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
  userId,
}) => {
  const router = useRouter();
  const tweetHref = `/tweet/${id}`;
  const userHref = `/${userName}`;
  return (
    <>
      <article
        className={
          "p-4 flex items-start gap-4 hover:bg-slate-700 cursor-pointer border-b border-slate-500"
        }
        onClick={() => {
          if (!tweetHref) return;
          if (tweetHref.includes("prov-id-no-interactivity")) return;
          router.push(tweetHref);
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
                ownerId={ownerId}
                tweetId={id}
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
              tweetId={id}
              userId={userId}
              likes={likes}
              mutationKey={queryKey}
            />
            <p>COMMENT</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default Tweet;
