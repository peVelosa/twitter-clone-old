"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import {
  MutationKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteTweet, getAllTweets } from "@/libs/api";
import type { FC } from "react";

type DeleteUniqueProps = {
  ownerId: string;
  queryKey: MutationKey;
  tweetId: string;
  replaceUrl: string;
};

const DeleteUnique: FC<DeleteUniqueProps> = ({
  ownerId,
  replaceUrl,
  queryKey,
  tweetId,
}) => {
  const { data: session } = useSession();

  const { data } = useInfiniteQuery<any>({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutate = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async () => {
      await deleteTweet({ tweetId, userId: ownerId });
      router.replace(replaceUrl);
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
        <FaTrash className="fill-red-600" />
      </button>
    </>
  ) : null;
};

export default DeleteUnique;
