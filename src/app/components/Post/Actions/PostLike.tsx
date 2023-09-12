"use client";
import { FaHeart } from "react-icons/fa";
import {
  type MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { likeTweet, unlikeTweet } from "@/libs/api";
import type { FC } from "react";
import type { Session } from "next-auth";

type PostLikeProps = {
  isUser: boolean;
  onLike: () => Promise<void>;
  onUnlike: () => Promise<void>;
  mutationKey: MutationKey;
  session: Session | null;
  children?: React.ReactNode;
};

const PostLike: FC<PostLikeProps> = ({
  isUser,
  mutationKey,
  children,
  onUnlike,
  onLike,
  session,
}) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: mutationKey,
    mutationFn: async () => {
      if (isUser) return await onUnlike();
      return await onLike();
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
        {children && (
          <span className="group-hover:text-red-600">{children}</span>
        )}
      </button>
    </>
  );
};

export default PostLike;
