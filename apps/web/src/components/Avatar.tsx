import { useEffect } from "react";
import Avatar from "react-nice-avatar";

import { useAvatarStore } from "../Stores/AvatarStore";

type Props = {
  role: string;
  className?: string;
  style?: React.CSSProperties;
};

function RoleAvatar({ role, className, style }: Props) {
  const ensureRole = useAvatarStore((s) => s.ensureRole);
  const avatar = useAvatarStore((s) => s.avatarsByRole[role]);

  useEffect(() => {
    ensureRole(role);
  }, [role, ensureRole]);

  if (!avatar) return null;

  return (
    <div className="ml-4">
      <Avatar
        className={`${className ?? ""} border-gray-400 border-2 shadow-xl`}
        style={{ ...style }}
        {...avatar}
      />
    </div>
  );
}

export default RoleAvatar;
