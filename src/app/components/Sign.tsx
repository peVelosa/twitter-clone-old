"use client";
import { signOut, signIn } from "next-auth/react";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { SidebarItem } from "./Sidebar/SidebarItem";
import type { FC } from "react";
import type { IconType } from "react-icons";

type SignProps = { mode: "signIn" | "signOut" };
type signConfig = {
  onClick: () => void;
  icon: IconType;
  className: React.ComponentProps<"button">["className"];
  label: string;
};

const signInConfig: signConfig = {
  onClick: signIn,
  icon: FaSignInAlt,
  className: "fill-green-400",
  label: "sign in",
};
const signOutConfig: signConfig = {
  onClick: signOut,
  icon: FaSignOutAlt,
  className: "fill-red-500",
  label: "sign out",
};

const Sign: FC<SignProps> = ({ mode }) => {
  return (
    <div>
      {mode === "signIn" ? (
        <>
          <SidebarItem.Root>
            <SidebarItem.Button
              onClick={() => signInConfig.onClick()}
              className="flex w-full items-center gap-2"
            >
              <SidebarItem.Icon
                icon={signInConfig.icon}
                className={signInConfig.className}
              />
              <SidebarItem.Label label={signInConfig.label} />
            </SidebarItem.Button>
          </SidebarItem.Root>
        </>
      ) : (
        <>
          <SidebarItem.Root>
            <SidebarItem.Button
              onClick={() => signOutConfig.onClick()}
              className="flex w-full items-center gap-2"
            >
              <SidebarItem.Icon
                icon={signOutConfig.icon}
                className={signOutConfig.className}
              />
              <SidebarItem.Label label={signOutConfig.label} />
            </SidebarItem.Button>
          </SidebarItem.Root>
        </>
      )}
    </div>
  );
};

export default Sign;
