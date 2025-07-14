import { MoreVertical, SearchIcon, SendIcon, StickerIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { Input } from "~/components/ui/input";
import { useChatStore } from "../hooks/useChatStore";
import { threads, type Thread } from "./dummy-data";
import { cn } from "~/lib/utils";

export function ChatThread() {
  return (
    <div className="flex h-screen w-full flex-col dark:bg-[url(public/bg-dark.png)]">
      <ChatThreadHeader className="p-4 dark:bg-[#161717]" />
      <ChatThreadContent className="" />
      <ChatThreadInput className="gap-2 rounded-full px-4 py-1 dark:bg-[#1e2020]" />
    </div>
  );
}

function ChatThreadContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex grow flex-col", className)} {...props}>
      Hola!!
    </div>
  );
}

function ChatThreadHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const currentThreadId = useChatStore((state) => state.currentThreadId);
  const { threadImage, threadName, isOnline } = threads.find(
    (t) => t._id == currentThreadId,
  ) as Thread;

  return (
    <div className={cn("flex justify-between", className)} {...props}>
      <div className="flex items-center gap-4">
        <Avatar className="size-10">
          <AvatarImage src={threadImage} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <p className="text-lg font-bold">{threadName}</p>
      </div>
      <div className="flex items-center gap-3">
        <BubbleIcon variant="gray" Icon={SearchIcon} />
        <BubbleIcon variant="gray" Icon={MoreVertical} />
      </div>
    </div>
  );
}

function ChatThreadInput({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="bg-transparent px-2 py-4">
      <div className={cn("flex w-full justify-between", className)} {...props}>
        <BubbleIcon variant="gray" Icon={StickerIcon} />
        <Input className="w-full border-none bg-transparent text-white focus:ring-0 focus:outline-none" />
        <BubbleIcon variant="green" Icon={SendIcon} />
      </div>
    </div>
  );
}
