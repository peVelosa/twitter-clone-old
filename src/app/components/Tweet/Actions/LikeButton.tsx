"use client";
import { FaHeart } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeTweet, unlikeTweet } from "@/libs/api";
import type { FC } from "react";

type LikeButtonProps = {
  isUser: boolean;
  likes: number;
  userId: string;
  tweetId: string;
};

const LikeButton: FC<LikeButtonProps> = ({
  isUser,
  likes,
  tweetId,
  userId,
}) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async () => {
      if (isUser) return await unlikeTweet({ userId, tweetId });
      return await likeTweet({ userId, tweetId });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  return (
    <>
      <button
        className="inline-flex items-center gap-2"
        onClick={() => mutate.mutate()}
      >
        <FaHeart className={`${isUser ? "fill-red-600" : null}`} />
        {likes}
      </button>
    </>
  );
};

export default LikeButton;
