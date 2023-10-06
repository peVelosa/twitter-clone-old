"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import {
  InfiniteData,
  MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteTweet } from "@/libs/api";
import type { FC } from "react";
import type { TweetType } from "@/types/api";

type DeleteProps = {
  ownerId: string;
  queryKey: MutationKey;
  tweetId: string;
  replaceUrl?: string;
};

const Delete: FC<DeleteProps> = ({
  ownerId,
  replaceUrl,
  queryKey,
  tweetId,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutate = useMutation({
    mutationKey: queryKey,
    mutationFn: async () => {
      if (replaceUrl) router.replace(replaceUrl);
      await deleteTweet({ tweetId, userId: ownerId });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousTweets = queryClient.getQueryData(queryKey);
      queryClient.setQueryData<unknown>(
        queryKey,
        (old: InfiniteData<TweetType[]>) => ({
          ...old,
          pages: old.pages.map((page) =>
            page.filter((tweet) => tweet.id !== tweetId),
          ),
        }),
      );

      return { previousTweets };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context?.previousTweets);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return session?.user.id === ownerId ? (
    <>
      <button
        className="p-2 hover:bg-red-300 rounded-full ml-auto block"
        onClick={(e) => {
          e.stopPropagation();
          mutate.mutate();
        }}
        disabled={!session?.user.id}
      >
        <FaTrash className="fill-red-600" />
      </button>
    </>
  ) : null;
};

export default Delete;
