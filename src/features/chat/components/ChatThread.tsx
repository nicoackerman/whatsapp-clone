import { MoreVertical, SearchIcon, SendIcon, StickerIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { Input } from "~/components/ui/input";
import { useChatStore } from "../hooks/useChatStore";
import { threads, type Thread } from "./dummy-data";
import { cn } from "~/lib/utils";

export function ChatThread() {
  return (
    <div className="flex h-screen w-full flex-col bg-[url(public/bg-light.png)] dark:bg-[url(public/bg-dark.png)]">
      <ChatThreadHeader className="border border-gray-700/10 bg-white p-4 dark:bg-[#161717]" />
      <ChatThreadContent className="" />
      <ChatThreadInput className="gap-2 rounded-full bg-white px-4 py-1 dark:bg-[#1e2020]" />
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
  const currentThreadMeta = useChatStore(
    (state) => state.currentThreadMeta,
  ) as Thread;

  return (
    <div className={cn("flex justify-between", className)} {...props}>
      <div className="flex items-center gap-4">
        <Avatar className="size-10">
          <AvatarImage src={currentThreadMeta.threadImage} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <p className="text-base">{currentThreadMeta.threadName}</p>
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
        <Input placeholder="Type a message" className="w-full border-none bg-transparent text-white focus:ring-0 focus:outline-none" />
        <BubbleIcon variant="green" Icon={SendIcon} />
      </div>
    </div>
  );
}
