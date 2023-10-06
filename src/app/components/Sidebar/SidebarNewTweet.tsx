"use client";

import { type FC } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { SidebarItem } from "./SidebarItem";
import Modal from "@/components/Modal/Modal";
import type { Session } from "next-auth";
import { usePathname, useSearchParams } from "next/navigation";
import NewTweet from "@/components/Post/Tweet/NewTweet";

type SidebarNewTweetProps = {
  session: Session | null;
};

const SidebarNewTweet: FC<SidebarNewTweetProps> = ({ session }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const showTweetModal = searchParams.get("showTweetModal");

  if (!session || !session.user) {
    return <></>;
  }

  return (
    <>
      <SidebarItem.Root className="w-full">
        <SidebarItem.Link
          className="w-full bg-sky-500 hover:bg-sky-400"
          href={pathName + "?showTweetModal=y"}
        >
          <SidebarItem.Icon
            icon={FaFeatherAlt}
            className={"md:hidden"}
          />
          <SidebarItem.Label
            label="Tweet"
            className={"hidden md:block"}
          />
        </SidebarItem.Link>
      </SidebarItem.Root>
      <Modal
        isOpen={showTweetModal === "y"}
        urlParam="showTweetModal"
        className="min-w-[500px] text-white"
      >
        <NewTweet session={session} />
      </Modal>
    </>
  );
};

export default SidebarNewTweet;
