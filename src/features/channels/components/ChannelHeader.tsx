import { MoreVertical, SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { BubbleIcon } from "~/components/ui/bubble-icon";
// import { useChatStore } from "../../hooks/useChatStore";
import { cn } from "~/lib/utils";

export default function ChannelHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // const currentThreadMeta = useChatStore((state) => state.currentChannelIdentifier)!;

  return (
    <div className={cn("flex justify-between", className)} {...props}>
      <div className="flex items-center gap-4">
        <Avatar className="size-10">
          {/* <AvatarImage src={currentThreadMeta.threadImage} /> */}
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        {/* <p className="text-base">{currentThreadMeta.threadName}</p> */}
      </div>
      <div className="flex items-center gap-3">
        <BubbleIcon variant="gray" Icon={SearchIcon} />
        <BubbleIcon variant="gray" Icon={MoreVertical} />
      </div>
    </div>
  );
}
