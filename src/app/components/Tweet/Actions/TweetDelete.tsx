"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTweet } from "@/libs/api";
import type { FC } from "react";

type TweetDeleteProps = {
  ownerId: string;
  tweetId: string;
};

const TweetDelete: FC<TweetDeleteProps> = ({ tweetId, ownerId }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async () => {
      await deleteTweet({ tweetId, userId: ownerId });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  return session?.user.id === ownerId ? (
    <>
      <button
        className="p-2 hover:bg-red-300 rounded-full ml-auto block"
        onClick={() => mutate.mutate()}
      >
        {session?.user.id === ownerId ? (
          <FaTrash className="fill-red-600" />
        ) : null}
      </button>
    </>
  ) : null;
};

export default TweetDelete;
