import { ScrollArea } from "~/components/ui/scroll-area";
import { PreviewChatBox } from "./PreviewChatBox";
import { MoreVertical } from "lucide-react";
import { conversations } from "./dummy-data";
import { BubbleIcon } from "~/components/ui/bubble-icon";
export function LeftChatPanel() {
  return (
    <div className="flex h-full grow flex-col justify-start space-y-7">
      <div className="flex w-full items-center justify-between px-4">
        <p className="text-2xl font-bold">WhatsApp</p>
        <BubbleIcon Icon={MoreVertical} variant={"gray"}/>
      </div>
      <ScrollArea className="h-[700px] w-full whitespace-nowrap">
        <div className="flex grow flex-col space-y-3">
          {conversations.map((conversation) => (
            <PreviewChatBox key={conversation._id} threadId={conversation._id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
