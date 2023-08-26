"use client";

import { ElementRef, useRef, useState } from "react";
import { FaFeatherAlt, FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { SidebarItem } from "./SidebarItem";
import Modal from "@/components/Modal/Modal";
import TweetHeader from "@/components/Tweet/TweetHeader";

function adjustTextAreaHeight(el: HTMLTextAreaElement) {
  el.style.height = "0px";
  const scrollHeight = el.scrollHeight;
  el.style.height = scrollHeight + "px";
}
function focusInput(el: HTMLElement | null) {
  if (!el) return;
  el.focus();
}

const SidebarNewTweet = () => {
  const { data: session } = useSession();
  const { mutate: _post } = useMutation({
    mutationKey: ["tweets"],
    mutationFn: async () => {},
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tweetRef = useRef<ElementRef<"textarea">>(null);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const postTweet = () => {
    _post();
  };

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!tweetRef.current) return;
    adjustTextAreaHeight(tweetRef.current);
    if (tweetRef.current.value.length >= 256) return;
    tweetRef.current.value = e.target.value;
  }

  if (!session?.user) {
    return <></>;
  }

  const {
    user: { userName, image, name },
  } = session;

  return (
    <>
      <SidebarItem.Root className="w-full">
        <SidebarItem.Button
          className="w-full bg-sky-500 hover:bg-sky-400"
          onClick={onOpen}
        >
          <SidebarItem.Icon
            icon={FaFeatherAlt}
            className={"md:hidden"}
          />
          <SidebarItem.Label
            label="Tweet"
            className={"hidden md:block"}
          />
        </SidebarItem.Button>
      </SidebarItem.Root>
      <Modal
        isOpen={isOpen}
        close={onClose}
      >
        <div
          className="bg-slate-700 w-fit min-h-44 mx-auto mt-44 p-4 rounded-md max-w-96 md:w-full"
          onClick={() => focusInput(tweetRef.current)}
        >
          <div className="flex justify-between items-start mb-4">
            <TweetHeader
              userName={userName}
              image={image}
              name={name}
            />
            <button
              className="p-2 hover:bg-red-400 rounded-full"
              onClick={onClose}
            >
              <FaTimes className="fill-red-700" />
            </button>
          </div>
          <textarea
            ref={tweetRef}
            onChange={onChange}
            placeholder="What's happening?"
            className="mt-2 min-h-[7rem] w-full resize-none bg-transparent focus:border-none focus:outline-none"
          />
        </div>
      </Modal>
    </>
  );
};

export default SidebarNewTweet;
