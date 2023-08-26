"use client";
import { signIn } from "next-auth/react";
import { FaSignInAlt } from "react-icons/fa";
import { SidebarItem } from "../Sidebar/SidebarItem";

const SignIn = () => {
  return (
    <>
      <SidebarItem.Root>
        <SidebarItem.Button
          onClick={() => signIn()}
          className="flex w-full items-center gap-2"
        >
          <SidebarItem.Icon icon={FaSignInAlt} className="fill-green-400" />
          <SidebarItem.Label label="sign in" />
        </SidebarItem.Button>
      </SidebarItem.Root>
    </>
  );
};

export default SignIn;
