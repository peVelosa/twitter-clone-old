"use client";
import ImageWithFallback from "@/components/ImageWithFallback";
import Modal from "@/components/Modal/Modal";
import { SingleTweetType } from "@/types/api";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { type FC, useEffect, useCallback, Fragment } from "react";

type LikesListProps = Pick<SingleTweetType, "likes"> & { tweetId: string };

const LikesList: FC<LikesListProps> = ({ likes, tweetId }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isLikeUrlTrue = searchParams.get("likes");

  const onOpen = useCallback(
    function onOpen() {
      router.replace(`${tweetId}?likes=true`);
    },
    [router, tweetId],
  );
  const onClose = () => router.replace(`${tweetId}?likes=false`);

  useEffect(() => {
    if (isLikeUrlTrue === "false" || !isLikeUrlTrue) return;
    onOpen();
  }, [isLikeUrlTrue, onOpen]);

  return (
    <>
      <Link
        href={`${tweetId}?likes=true`}
        className="group"
        onClick={onOpen}
      >
        {likes.length} <span className="group-hover:underline">Likes</span>
      </Link>
      <Modal
        isOpen={isLikeUrlTrue === "true"}
        close={onClose}
      >
        {likes.map((user) => (
          <Fragment key={user.id}>
            <h2 className="font-bold text-xl mb-8">Liked by</h2>
            <div className="flex gap-4 items-center">
              <ImageWithFallback
                alt="user profile"
                src={user.image}
                width={40}
                height={40}
                className="rounded-full"
              />
              <Link
                href={`/${user.userName}`}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[12ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis text-sm sm:text-base"
              >
                <span className="font-bold hover:underline">{user.name}</span>
              </Link>
              <Link
                href={`/${user.userName}`}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[12ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis text-sm sm:text-base"
              >
                <span className="text-white/70">@{user.userName}</span>
              </Link>
            </div>
          </Fragment>
        ))}
      </Modal>
    </>
  );
};

export default LikesList;
