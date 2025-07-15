import { ScrollArea } from "~/components/ui/scroll-area";
import { PreviewChatBox } from "./PreviewChatBox";
import { MoreVertical } from "lucide-react";
import { threads } from "./dummy-data";
import { BubbleIcon } from "~/components/ui/bubble-icon";
export function LeftChatPanel() {
  return (
    <div className="flex h-full grow flex-col justify-start space-y-7">
      <div className="flex w-full items-center justify-between px-2">
        <p className="text-xl font-bold text-[#1DAA61] dark:text-white">WhatsApp</p>
        <BubbleIcon Icon={MoreVertical} variant={"gray"} />
      </div>
      <ScrollArea className="h-[700px] w-full whitespace-nowrap">
        <div className="flex grow flex-col space-y-3">
          {threads.map((thread) => (
            <PreviewChatBox key={thread._id} thread={thread} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
