import { getServerSession } from "next-auth/next";

import { FaUser, FaBell, FaHome, FaTwitter } from "react-icons/fa";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { SidebarItem } from "./SidebarItem/index";
import SidebarNewTweet from "./SidebarNewTweet";
import Sign from "@/components/Sign";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <aside className="flex gap-4 flex-col pl-1 py-4 sm:pl-3">
      <SidebarItem.Root className={""}>
        <SidebarItem.Link
          href={"/"}
          className={"lg:py-4"}
        >
          <SidebarItem.Icon
            icon={FaTwitter}
            className={"fill-sky-500"}
          />
        </SidebarItem.Link>
      </SidebarItem.Root>

      <SidebarItem.Root>
        <SidebarItem.Link href={"/"}>
          <SidebarItem.Icon icon={FaHome} />
          <SidebarItem.Label label="home" />
        </SidebarItem.Link>
      </SidebarItem.Root>

      {session?.user.userName ? (
        <>
          <SidebarItem.Root>
            <SidebarItem.Link href={"/notifications"}>
              <SidebarItem.Icon icon={FaBell} />
              <SidebarItem.Label label="notifications" />
            </SidebarItem.Link>
          </SidebarItem.Root>
          <SidebarItem.Root>
            <SidebarItem.Link href={`/${session.user.userName}`}>
              <SidebarItem.Icon icon={FaUser} />
              <SidebarItem.Label label="profile" />
            </SidebarItem.Link>
          </SidebarItem.Root>

          <Sign mode="signOut" />
        </>
      ) : (
        <Sign mode="signIn" />
      )}
      <SidebarNewTweet session={session} />
    </aside>
  );
};

export default Sidebar;
