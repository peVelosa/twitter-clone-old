import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageWithFallback from "../ImageWithFallback";
import type { FC } from "react";
import { TweetType } from "@/types/api";
import PostPublished from "../Post/Wrapper/PostPublished";

type TweetProps = {
  data: TweetType;
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
}) => {
  const router = useRouter();
  const tweetHref = `tweet/${id}`;
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
              <PostPublished publishedAt={updatedAt} />
              DELETE
            </div>
          </div>
          <p className="whitespace-pre">{body}</p>
          <div
            className={"flex items-center gap-4 mt-4"}
            onClick={(e) => e.stopPropagation()}
          >
            <p>LIKE</p>
            <p>COMMENT</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default Tweet;
