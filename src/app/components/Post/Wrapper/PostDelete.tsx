"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import {
  MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteTweet } from "@/libs/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";

type PostDeleteProps = {
  ownerId: string;
  queryKey: MutationKey;
  queryFn: () => Promise<void>;
  replaceUrl?: string;
  optmisticUpdate?: () => any;
};

const PostDelete: FC<PostDeleteProps> = ({
  ownerId,
  replaceUrl,
  queryFn,
  queryKey,
  optmisticUpdate,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutate = useMutation({
    mutationKey: queryKey,
    mutationFn: async () => {
      if (replaceUrl) router.replace(replaceUrl);
      await queryFn();
    },
    onMutate: async () => {
      if (!optmisticUpdate) return;
      return optmisticUpdate();
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

export default PostDelete;
