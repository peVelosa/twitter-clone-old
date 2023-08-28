"use client";
import { useRef, useState, type ElementRef, FC } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { adjustTextAreaHeight, focusInput } from "@/libs/helpers";
import axios from "@/libs/axios";
import SpinnerCounter from "@/components/SpinnerCounter";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

const HomeNewTweet = () => {
  const { data: session } = useSession();

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
  if (!session || !session.user) {
    return <></>;
  }

  const {
    user: { userName, image, name, id: userId },
  } = session;

  const tweetLength = tweetInput.length;

  return (
    <>
      <div
        className="border-b-[1px] border-b-gray-500 px-2 py-4"
        onClick={() => focusInput(tweetRef.current)}
      >
        <div className="flex items-start gap-2">
          <div>
            <Link href={`/${userName}`}>
              <ImageWithFallback
                alt="image profile"
                src={image}
                width={50}
                height={50}
                className="rounded-full"
              />
            </Link>
          </div>
          <textarea
            ref={tweetRef}
            value={tweetInput}
            onChange={onChange}
            placeholder="What's happening?"
            className="mt-2 min-h-[7rem] w-full resize-none bg-transparent focus:border-none focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <SpinnerCounter length={tweetLength} />
          <button
            className="bg-sky-500 hover:bg-sky-400 disabled:bg-sky-300 disabled:hover:bg-sky-300 px-4 py-1 rounded-full block"
            onClick={() => postTweet({ tweetBody: tweetInput })}
            disabled={tweetLength === 0 || tweetLength > 256}
          >
            Tweet
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeNewTweet;
