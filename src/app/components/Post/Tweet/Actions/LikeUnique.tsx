"use client";
import { AiOutlineHeart } from "react-icons/ai";
import {
  type MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { unlikeTweet, likeTweet } from "@/libs/api";
import type { FC } from "react";
import type { LikesUnion, SingleTweetType } from "@/types/api";
import { useSession } from "next-auth/react";

type LikeProps = {
  likes: LikesUnion[];
  mutationKey: MutationKey;
  tweetId: string;
};

const LikeUnique: FC<LikeProps> = ({ likes, mutationKey, tweetId }) => {
  const { data: session } = useSession();

  const hasUserAlreadyLikedPost = likes.some(
    (user) => session?.user.id === user.id,
  );

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: mutationKey,
    mutationFn: async () =>
      hasUserAlreadyLikedPost
        ? await unlikeTweet({
            tweetId,
            userId: session?.user.id,
          })
        : await likeTweet({
            tweetId,
            userId: session?.user.id,
          }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: mutationKey });

      const previousTweets = queryClient.getQueryData(mutationKey);

      queryClient.setQueryData<unknown>(
        mutationKey,
        (old: SingleTweetType) => ({
          ...old,
          likes: hasUserAlreadyLikedPost
            ? [...old.likes.filter((user) => user.id !== session?.user.id)]
            : [
                ...old.likes,
                {
                  id: session?.user.id,
                  image: session?.user.image,
                  name: session?.user.name,
                  userName: session?.user.userName,
                },
              ],
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
      </button>
    </>
  );
};

export default LikeUnique;
