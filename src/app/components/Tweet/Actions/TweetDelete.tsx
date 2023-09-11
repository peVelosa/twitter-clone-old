"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTweet } from "@/libs/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";

type TweetDeleteProps = {
  ownerId: string;
  tweetId: string;
};

const TweetDelete: FC<TweetDeleteProps> = ({ tweetId, ownerId }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutate = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async () => {
      await deleteTweet({ tweetId, userId: ownerId });
      router.replace("/");
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

export default TweetDelete;
