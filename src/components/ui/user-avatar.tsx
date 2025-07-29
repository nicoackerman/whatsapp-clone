import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
interface UserAvatarProps {
  profileImg: string;
  userName: string;
  className: string;
}
export function UserAvatar({
  profileImg,
  userName,
  className,
}: UserAvatarProps) {
  return (
    <>
      <Avatar className={className}>
        <AvatarImage src={profileImg} alt={`${userName}'s profile`} />
        <AvatarFallback>{userName?.charAt(0) ?? "U"}</AvatarFallback>
      </Avatar>
    </>
  );
}
