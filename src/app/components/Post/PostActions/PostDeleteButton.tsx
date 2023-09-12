"use client";

import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import {
  type MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteComment, deleteTweet } from "@/libs/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";

type PostDeleteButtonProps = {
  ownerId: string;
  queryKey: MutationKey;
  queryFn: () => void;
  replace?: string;
};
const PostDeleteButton: FC<PostDeleteButtonProps> = ({
  ownerId,
  queryKey,
  replace = undefined,
  queryFn,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutate = useMutation({
    mutationKey: queryKey,
    mutationFn: async () => {
      await queryFn();
      if (replace) router.replace(replace);
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
        {session?.user.id === ownerId ? (
          <FaTrash className="fill-red-600" />
        ) : null}
      </button>
    </>
  ) : null;
};

export default PostDeleteButton;
