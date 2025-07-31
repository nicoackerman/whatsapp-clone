import { Info, MoreVertical, SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import DebuggTrigger from "~/features/debug/components/debuggTrigger";
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <BubbleIcon variant="gray" Icon={SearchIcon} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="dark bg-popover text-popover-foreground w-56">
            <DropdownMenuItem>
              <Info className="mr-2 h-4 w-4" />
              Delete channel
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Info className="mr-2 h-4 w-4" />
              Delete all messages
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Info className="mr-2 h-4 w-4" />
              Debug channel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <BubbleIcon variant="gray" Icon={SearchIcon} />
        <BubbleIcon variant="gray" Icon={MoreVertical} />
        <DebuggTrigger />
      </div>
    </div>
  );
}
