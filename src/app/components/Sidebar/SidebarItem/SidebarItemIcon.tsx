import type { HTMLAttributes, FC } from "react";
import type { IconType } from "react-icons";

interface SidebarItemIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconType;
}

const SidebarItemIcon: FC<SidebarItemIconProps> = ({ icon: Icon, ...rest }) => {
  return (
    <div>
      <Icon
        size={28}
        className={rest.className}
      />
    </div>
  );
};

export default SidebarItemIcon;
