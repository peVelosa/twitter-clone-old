"use client";
import { AiOutlineHeart } from "react-icons/ai";
import {
  type MutationKey,
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";

import { likeComment, unlikeComment } from "@/libs/api";
import type { FC } from "react";
import type { CommentType } from "@/types/api";

type LikeProps = {
  likes: { id: string }[];
  mutationKey: MutationKey;
  userId: string;
  tweetId: string;
  commentId: string;
};

const Like: FC<LikeProps> = ({
  likes,
  mutationKey,
  userId,
  tweetId,
  commentId,
}) => {
  const hasUserAlreadyLikedPost = likes.some((user) => userId === user.id);
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: mutationKey,
    mutationFn: async () =>
      hasUserAlreadyLikedPost
        ? await unlikeComment({
            commentId,
            tweetId,
            userId,
          })
        : await likeComment({
            commentId,
            tweetId,
            userId,
          }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: mutationKey });

      const previousTweets = queryClient.getQueryData(mutationKey);

      queryClient.setQueryData<unknown>(
        mutationKey,
        (old: InfiniteData<CommentType[]>) => ({
          ...old,
          pages: old.pages.map((page) =>
            page.map((updatedComment) => {
              if (updatedComment.id === commentId) {
                return {
                  ...updatedComment,
                  likes: hasUserAlreadyLikedPost
                    ? updatedComment.likes.filter(
                        ({ id: likeUserId }) => likeUserId !== userId,
                      )
                    : [
                        ...updatedComment.likes,
                        {
                          id: userId,
                        },
                      ],
                };
              }
              return { ...updatedComment };
            }),
          ),
        }),
      );

      return { previousTweets };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(mutationKey, context?.previousTweets);
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
        disabled={!userId}
      >
        <AiOutlineHeart
          className={`group-hover:bg-rose-100 p-2 rounded-full group-disabled:fill-current group-disabled:bg-transparent ${
            hasUserAlreadyLikedPost
              ? "fill-red-600"
              : "group-hover:fill-red-600"
          }`}
          size={40}
        />
        <span className="group-hover:text-red-600 group-disabled:text-inherit">
          {likes.length === 0 ? "" : likes.length}
        </span>
      </button>
    </>
  );
};

export default Like;
