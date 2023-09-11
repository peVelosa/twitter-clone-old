"use client";
import { FaHeart } from "react-icons/fa";
import {
  type MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { likeTweet, unlikeTweet } from "@/libs/api";
import type { FC } from "react";
import { useSession } from "next-auth/react";

type LikeButtonProps = {
  isUser: boolean;
  userId: string;
  tweetId: string;
  likes?: number;
  mutationKey: MutationKey;
};

const LikeButton: FC<LikeButtonProps> = ({
  isUser,
  likes,
  tweetId,
  userId,
  mutationKey,
}) => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: mutationKey,
    mutationFn: async () => {
      if (isUser) return await unlikeTweet({ userId, tweetId });
      return await likeTweet({ userId, tweetId });
    },
    onSettled: () => {
      queryClient.invalidateQueries(mutationKey);
    },
  });

  return (
    <>
      <button
        className="inline-flex items-center gap-2 group"
        onClick={() => mutate.mutate()}
        disabled={!session?.user.id}
      >
        <FaHeart
          className={`group-hover:bg-red-200 p-2 rounded-full  ${
            isUser ? "fill-red-600" : "hover:fill-red-600"
          }`}
          size={35}
        />
        {likes && <span className="group-hover:text-red-600">{likes}</span>}
      </button>
    </>
  );
};

export default LikeButton;
