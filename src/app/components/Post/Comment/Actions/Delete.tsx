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
import { deleteComment } from "@/libs/api";
import type { FC } from "react";
import type { CommentType } from "@/types/api";

type DeleteProps = {
  userId: string;
  queryKey: MutationKey;
  tweetId: string;
  commentId: string;
  replaceUrl?: string;
};

const Delete: FC<DeleteProps> = ({
  userId,
  replaceUrl,
  queryKey,
  tweetId,
  commentId,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutate = useMutation({
    mutationKey: queryKey,
    mutationFn: async () => {
      if (replaceUrl) router.replace(replaceUrl);
      await deleteComment({ tweetId, commentId, userId });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousTweets = queryClient.getQueryData(queryKey);
      queryClient.setQueryData<unknown>(
        queryKey,
        (old: InfiniteData<CommentType[]>) => ({
          ...old,
          pages: old.pages.map((page) =>
            page.filter((comment) => comment.id !== commentId),
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

  return session?.user.id === userId ? (
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
