import { ScrollArea } from "~/components/ui/scroll-area";
import { PreviewChatBox } from "./PreviewChatBox";
import { MoreVertical } from "lucide-react";

export function LeftChatPanel() {
  return (
    <div className="flex h-full grow flex-col justify-start space-y-7">
      <div className="flex w-full items-center justify-between px-4">
        <p className="text-[20px]">WhatsApp</p>
        <MoreVertical className="cursor-pointer" />
      </div>
      <ScrollArea className="h-[700px] w-full whitespace-nowrap">
        <div className="flex grow flex-col space-y-3">
          <PreviewChatBox />
          <PreviewChatBox />
          <PreviewChatBox />
          <PreviewChatBox />
          <PreviewChatBox />
          <PreviewChatBox />
        </div>
      </ScrollArea>
    </div>
  );
}
