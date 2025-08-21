"use client";
import { UserAvatar } from "~/components/ui/user-avatar";
import UserName from "~/components/ui/user-name";
import { ChatHeader } from "~/features/chat/components/ui/ChatHeader";
import DebugTrigger from "~/features/debug/components/DebugTrigger";
export default function ChannelHeader({
  ...props
}: React.ComponentProps<"div">) {
  return (
    <ChatHeader {...props}>
      <ChatHeader.Left>
        <UserAvatar
          className="size-10"
          userName={"userName"}
          profileImg={"https://github.com/evilrabbit.png"}
        />
        <UserName username="User" />
      </ChatHeader.Left>
      <ChatHeader.Right>
        <ChatHeader.Menu>
          <ChatHeader.MenuItem alt="Delete all messages" shortcut="c" />
          <ChatHeader.MenuItem alt="Delete all messages" shortcut="c" />
          <ChatHeader.MenuItem alt="Delete all messages" shortcut="c" />
        </ChatHeader.Menu>
        <DebugTrigger />
      </ChatHeader.Right>
    </ChatHeader>
  );
}
