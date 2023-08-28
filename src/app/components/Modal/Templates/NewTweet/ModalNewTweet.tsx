"use client";
import { useRef, useState, type ElementRef, FC } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { adjustTextAreaHeight, focusInput } from "@/libs/helpers";
import axios from "@/libs/axios";

import SpinnerCounter from "@/components/SpinnerCounter";
import ModalNewTweetHeader from "./ModalNewTweetHeader";

type ModalNewTweetProps = {
  closeModal: () => void;
};

const ModalNewTweet: FC<ModalNewTweetProps> = ({ closeModal }) => {
  const { data: session } = useSession();

  const { mutate: _post } = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async ({ tweetBody }: { tweetBody: string }) => {
      setTweetInput("");
      closeModal();
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

  const {
    user: { userName, image, name, id: userId },
  } = session!;

  return (
    <>
      <div
        className="bg-slate-700 w-fit min-h-44 mx-auto mt-44 p-4 rounded-md md:max-w-xl md:w-full"
        onClick={() => focusInput(tweetRef.current)}
      >
        <div className="flex justify-between items-start mb-4">
          <ModalNewTweetHeader
            image={image}
            name={name}
            userName={userName}
            closeModal={closeModal}
            key={userName}
          />
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
            <SpinnerCounter length={tweetLength} />
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

export default ModalNewTweet;
