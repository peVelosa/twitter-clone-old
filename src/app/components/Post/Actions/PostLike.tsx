"use client";
import { AiOutlineHeart } from "react-icons/ai";
import {
  type MutationKey,
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";

import type { FC } from "react";
import type { Session } from "next-auth";
import { TweetType } from "@/types/api";

type PostLikeProps = {
  likes: { id: string }[];
  onLike: () => Promise<void>;
  onUnlike: () => Promise<void>;
  mutationKey: MutationKey;
  postId: string;
  session: Session | null;
  children?: React.ReactNode;
};

const PostLike: FC<PostLikeProps> = ({
  likes,
  postId,
  mutationKey,
  children,
  onUnlike,
  onLike,
  session,
}) => {
  const hasUserAlreadyLikedPost = likes.some(
    (user) => session?.user.id === user.id,
  );
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: mutationKey,
    mutationFn: async () =>
      hasUserAlreadyLikedPost ? await onUnlike() : await onLike(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["tweets"] });

      const previousTweets = queryClient.getQueryData(["tweets"]);

      queryClient.setQueryData<unknown>(
        ["tweets"],
        (old: InfiniteData<TweetType[]>) => ({
          ...old,
          pages: old.pages.map((page) =>
            page.map((updatedTweet) => {
              if (updatedTweet.id === postId) {
                return {
                  ...updatedTweet,
                  likes: hasUserAlreadyLikedPost
                    ? updatedTweet.likes.filter(
                        ({ id: likeUserId }) => likeUserId !== session?.user.id,
                      )
                    : [
                        ...updatedTweet.likes,
                        {
                          id: session?.user.id,
                        },
                      ],

                  _count: {
                    ...updatedTweet._count,
                    likes: hasUserAlreadyLikedPost
                      ? updatedTweet._count.likes - 1
                      : updatedTweet._count.likes + 1,
                  },
                };
              }
              return { ...updatedTweet };
            }),
          ),
        }),
      );

      return { previousTweets };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["tweets"], context?.previousTweets);
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
        <AiOutlineHeart
          className={`group-hover:bg-rose-100 p-2 rounded-full group-disabled:fill-current group-disabled:bg-transparent ${
            hasUserAlreadyLikedPost
              ? "fill-red-600"
              : "group-hover:fill-red-600"
          }`}
          size={40}
        />
        <span className="group-hover:text-red-600 group-disabled:text-inherit">
          {children}
        </span>
      </button>
    </>
  );
};

export default PostLike;
