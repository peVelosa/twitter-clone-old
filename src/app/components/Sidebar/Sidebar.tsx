import { getServerSession } from "next-auth/next";

import { FaUser, FaBell, FaHome, FaTwitter } from "react-icons/fa";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { SidebarItem } from "./SidebarItem/index";
import SignIn from "../SignButton/SignIn";
import SignOut from "../SignButton/SignOut";
import SidebarNewTweet from "./SidebarNewTweet";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <aside className="flex gap-4 flex-col pl-1">
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

      <SidebarItem.Root>
        <SidebarItem.Link href={"/notifications"}>
          <SidebarItem.Icon icon={FaBell} />
          <SidebarItem.Label label="notifications" />
        </SidebarItem.Link>
      </SidebarItem.Root>

      {session?.user.userName ? (
        <>
          <SidebarItem.Root>
            <SidebarItem.Link href={`/profile/${session.user.userName}`}>
              <SidebarItem.Icon icon={FaUser} />
              <SidebarItem.Label label="profile" />
            </SidebarItem.Link>
          </SidebarItem.Root>

          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
      <SidebarNewTweet />
    </aside>
  );
};

export default Sidebar;
