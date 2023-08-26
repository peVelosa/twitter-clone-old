"use client";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import { SidebarItem } from "../Sidebar/SidebarItem";

const SignOut = () => {
  return (
    <SidebarItem.Root>
      <SidebarItem.Button
        onClick={() => signOut()}
        className="flex w-full items-center gap-2"
      >
        <SidebarItem.Icon
          icon={FaSignOutAlt}
          className="fill-red-500"
        />
        <SidebarItem.Label label="sign out" />
      </SidebarItem.Button>
    </SidebarItem.Root>
  );
};

export default SignOut;
