import { MoreVertical, SearchIcon } from "lucide-react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { UserAvatar } from "~/components/ui/user-avatar";
import { cn } from "~/lib/utils";
import DebugTrigger from "../debug/DebugTrigger";

export default function ChannelHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // const currentThreadMeta = useChatStore((state) => state.currentChannelIdentifier)!;

  return (
    <div className={cn("flex justify-between", className)} {...props}>
      <div className="flex items-center gap-4">
        <UserAvatar
          className="size-10"
          userName={"userName"}
          profileImg={"https://github.com/evilrabbit.png"}
        />
        {/* <p className="text-base">{currentThreadMeta.threadName}</p> */}
      </div>
      <div className="flex items-center gap-3">
        <BubbleIcon variant="gray" Icon={SearchIcon} />
        <BubbleIcon variant="gray" Icon={MoreVertical} />
        <DebugTrigger />
      </div>
    </div>
  );
}
