import { MoreVertical, SearchIcon, SendIcon, StickerIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { Input } from "~/components/ui/input";

export function ChatThread() {
  return (
    <div className="flex h-screen w-full flex-col dark:bg-[url(public/bg-dark.png)]">
      <ChatThreadHeader />
      <div className="flex grow flex-col">
        kjfasljdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
      </div>
      <ChatThreadInput />
    </div>
  );
}

function ChatThreadHeader() {
  return (
    <div className="flex justify-between p-4 dark:bg-[#161717]">
      <div className="flex items-center gap-4">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-lg font-bold">Mama</p>
      </div>
      <div className="flex items-center gap-3">
        <BubbleIcon variant="gray" Icon={SearchIcon} />
        <BubbleIcon variant="gray" Icon={MoreVertical} />
      </div>
    </div>
  );
}

function ChatThreadInput() {
  return (
    <div className="bg-transparent px-2 py-4">
      <div className="flex w-full justify-between gap-2 rounded-full px-4 py-1 dark:bg-[#1e2020]">
        <BubbleIcon variant="gray" Icon={StickerIcon} />
        <Input className="w-full border-none bg-transparent text-white focus:ring-0 focus:outline-none" />
        <BubbleIcon variant="green" Icon={SendIcon} />
      </div>
    </div>
  );
}
