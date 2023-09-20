"use client";
import ImageWithFallback from "@/components/ImageWithFallback";
import Modal from "@/components/Modal/Modal";
import { SingleTweetType } from "@/types/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type FC } from "react";

type LikesListProps = Pick<SingleTweetType, "likes"> & { tweetId: string };

const LikesList: FC<LikesListProps> = ({ likes, tweetId }) => {
  const searchParams = useSearchParams();

  const showLikes = searchParams.get("showLikes");

  return (
    <>
      <Link
        href={`${tweetId}?showLikes=y`}
        className="group"
      >
        {likes.length} <span className="group-hover:underline">Likes</span>
      </Link>
      <Modal
        isOpen={showLikes === "y"}
        urlParam="showLikes"
        className="text-white"
      >
        {likes.map((user) => (
          <div key={user.id}>
            <h2 className="font-bold text-xl mb-8">Liked by</h2>
            <div className="flex gap-4 items-center">
              <Link href={`/${user.userName}`}>
                <ImageWithFallback
                  alt="user profile"
                  src={user.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
              <Link
                href={`/${user.userName}`}
                className="max-w-[12ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis text-sm sm:text-base"
              >
                <span className="font-bold hover:underline">{user.name}</span>
              </Link>
              <Link
                href={`/${user.userName}`}
                className="max-w-[12ch] overflow-hidden sm:max-w-fit whitespace-nowrap text-ellipsis text-sm sm:text-base"
              >
                <span className="text-white/70">@{user.userName}</span>
              </Link>
            </div>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default LikesList;
