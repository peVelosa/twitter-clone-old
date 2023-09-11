"use client";
import { useRef, useState, type ElementRef, FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adjustTextAreaHeight, focusInput } from "@/libs/helpers";

import CircularProgress from "@/components/CircularProgress";
import ImageWithFallback from "@/components/ImageWithFallback";
import type { Session } from "next-auth";
import Link from "next/link";
import { createPost } from "@/libs/api";

type NewCommentProps = {
  session: Session | null;
  onClose?: () => void;
  tweetId: string;
};

const NewComment: FC<NewCommentProps> = ({ tweetId, session, onClose }) => {
  const queryClient = useQueryClient();

  const { mutate: _post } = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async ({ postBody }: { postBody: string }) => {
      setPostInput("");
      if (onClose) {
        onClose();
      }
      await createPost({ body: postBody, tweetId, userId });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  const postRef = useRef<ElementRef<"textarea">>(null);
  const [postInput, setPostInput] = useState<string>("");

  const postTweet = ({ postBody }: { postBody: string }) => {
    _post({ postBody });
  };

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!postRef.current) return;
    adjustTextAreaHeight(postRef.current);
    setPostInput(e.target.value);
  }
  const postLength = postInput.length;

  if (!session) {
    return <></>;
  }
  const {
    user: { image, id: userId },
  } = session;

  return (
    <>
      <div
        onClick={() => focusInput(postRef.current)}
        className="p-4 border-b border-slate-500"
      >
        <div className="flex items-start gap-4">
          <div
            className="mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href={`/${session.user.userName}`}>
              <ImageWithFallback
                src={image}
                alt="profile image"
                width={42}
                height={42}
                className="rounded-full w-fit hover:scale-105 cursor-pointer"
              />
            </Link>
          </div>
          <textarea
            ref={postRef}
            onChange={onChange}
            value={postInput}
            placeholder="Post your reply!"
            className="mt-2 min-h-[4rem] w-full resize-none bg-transparent focus:border-none focus:outline-none text-lg"
            autoFocus
          />
        </div>
        <div>
          {postLength > 0 && (
            <div>
              <span
                className={`${
                  postLength < 160
                    ? "text-white"
                    : postLength < 220
                    ? "text-yellow-400"
                    : "text-red-400 font-bold"
                }`}
              >
                {postLength}
              </span>{" "}
              / 256
            </div>
          )}
          <div className="flex items-center justify-end gap-4">
            <CircularProgress length={postLength} />
            <button
              onClick={() => postTweet({ postBody: postInput })}
              className="px-4 py-1 bg-sky-500 rounded-full hover:bg-sky-600 disabled:bg-sky-300 w-fit block"
              disabled={postLength === 0 || postLength > 256}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewComment;
