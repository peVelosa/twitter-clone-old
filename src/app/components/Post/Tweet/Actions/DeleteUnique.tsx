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
import { type FC } from "react";
import { TweetType } from "@/types/api";

type DeleteUniqueProps = {
  ownerId: string;
  queryKey: MutationKey;
  tweetId: string;
};

const DeleteUnique: FC<DeleteUniqueProps> = ({
  ownerId,
  queryKey,
  tweetId,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: _delete } = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async () => {
      router.back();
      await deleteTweet({ tweetId, userId: ownerId });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["tweets"] });

      const previousTweets = queryClient.getQueryData(["tweets"]);
      queryClient.setQueryData<unknown>(
        ["tweets"],
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
  });

  return session?.user.id === ownerId ? (
    <>
      <button
        className="p-2 hover:bg-red-300 rounded-full ml-auto block"
        onClick={() => {
          _delete();
        }}
        disabled={!session?.user.id}
      >
        <FaTrash className="fill-red-600" />
      </button>
    </>
  ) : null;
};

export default DeleteUnique;
