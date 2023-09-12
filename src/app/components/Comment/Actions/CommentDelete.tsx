"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/libs/api";
import type { FC } from "react";

type CommentDeleteProps = {
  ownerId: string;
  tweetId: string;
  commentId: string;
};

const CommentDelete: FC<CommentDeleteProps> = ({
  tweetId,
  ownerId,
  commentId,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async () => {
      await deleteComment({ tweetId, userId: ownerId, commentId });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tweets"]);
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
        {session?.user.id === ownerId ? (
          <FaTrash className="fill-red-600" />
        ) : null}
      </button>
    </>
  ) : null;
};

export default CommentDelete;