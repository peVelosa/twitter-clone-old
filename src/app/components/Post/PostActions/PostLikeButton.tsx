"use client";
import { FaHeart } from "react-icons/fa";
import {
  type MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { likeComment, likeTweet, unlikeComment, unlikeTweet } from "@/libs/api";
import type { FC } from "react";
import { useSession } from "next-auth/react";

type PostLikeButtonProps = {
  userId: string;
  tweetId: string;
  likes: { id: string }[];
  mutationKey: MutationKey;
  commentId?: string;
  children?: React.ReactNode;
};

const PostLikeButton: FC<PostLikeButtonProps> = ({
  likes,
  tweetId,
  userId,
  mutationKey,
  commentId,
  children,
}) => {
  const isUser = likes.some((user) => userId === user.id);

  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { mutate: _toggleLike } = useMutation({
    mutationKey: mutationKey,
    mutationFn: async () => {
      if (commentId) {
        if (isUser) return await unlikeComment({ userId, tweetId, commentId });
        return await likeComment({ userId, tweetId, commentId });
      }
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
        onClick={() => _toggleLike()}
        disabled={!session?.user.id}
      >
        <FaHeart
          className={`group-hover:bg-red-200 p-2 rounded-full  ${
            isUser ? "fill-red-600" : "hover:fill-red-600"
          }`}
          size={35}
        />
        {children && (
          <span className="group-hover:text-red-600">{children}</span>
        )}
      </button>
    </>
  );
};

export default PostLikeButton;
