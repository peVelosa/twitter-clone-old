"use client";
import { useRef, useState, type ElementRef, FC } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "@/libs/axios";
import { adjustTextAreaHeight, focusInput } from "@/libs/helpers";

import CircularProgress from "@/components/CircularProgress";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import type { Session } from "next-auth";

type NewTweetProps = {
  className?: React.ComponentProps<"div">["className"];
  session: Session | null;
};

const NewTweet: FC<NewTweetProps> = ({ className, session }) => {
  const { mutate: _post } = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async ({ tweetBody }: { tweetBody: string }) => {
      setTweetInput("");
      await axios.post("/tweet", { body: tweetBody, userId });
    },
  });

  const tweetRef = useRef<ElementRef<"textarea">>(null);
  const [tweetInput, setTweetInput] = useState<string>("");

  const postTweet = ({ tweetBody }: { tweetBody: string }) => {
    _post({ tweetBody });
  };

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!tweetRef.current) return;
    adjustTextAreaHeight(tweetRef.current);
    setTweetInput(e.target.value);
  }
  const tweetLength = tweetInput.length;

  if (!session) {
    return <></>;
  }
  const {
    user: { userName, image, name, id: userId },
  } = session;

  return (
    <>
      <div
        onClick={() => focusInput(tweetRef.current)}
        className={className}
      >
        <div className="flex justify-between items-start mb-4">
          <Link
            href={`/${userName}`}
            className="w-fit block"
          >
            <ImageWithFallback
              src={image}
              alt="profile image"
              width={42}
              height={42}
              className="rounded-full hover:scale-110 cursor-pointer w-fit"
            />
          </Link>
        </div>
        <textarea
          ref={tweetRef}
          onChange={onChange}
          value={tweetInput}
          placeholder="What's happening?"
          className="mt-2 min-h-[7rem] w-full resize-none bg-transparent focus:border-none focus:outline-none"
          autoFocus
        />
        <div>
          <div>
            <span
              className={`${
                tweetLength < 160
                  ? "text-white"
                  : tweetLength < 220
                  ? "text-yellow-400"
                  : "text-red-400 font-bold"
              }`}
            >
              {tweetLength}
            </span>{" "}
            / 256
          </div>
          <div className="flex items-center justify-end gap-4">
            <CircularProgress length={tweetLength} />
            <button
              onClick={() => postTweet({ tweetBody: tweetInput })}
              className="px-4 py-1 bg-sky-500 rounded-full hover:bg-sky-600 disabled:bg-sky-300 w-fit block"
              disabled={tweetLength === 0 || tweetLength > 256}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTweet;
