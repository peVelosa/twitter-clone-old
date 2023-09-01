"use client";

import { useState, type FC } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { SidebarItem } from "./SidebarItem";
import Modal from "@/components/Modal/Modal";
import NewTweet from "@/components/Tweet/NewTweet";
import type { Session } from "next-auth";

type SidebarNewTweetProps = {
  session: Session | null;
};

const SidebarNewTweet: FC<SidebarNewTweetProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  if (!session || !session.user) {
    return <></>;
  }

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
        <NewTweet session={session} />
      </Modal>
    </>
  );
};

export default SidebarNewTweet;
