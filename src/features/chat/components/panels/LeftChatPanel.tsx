"use client";
import { ScrollArea } from "~/components/ui/scroll-area";
import { MoreVertical } from "lucide-react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import Link from "next/link";
import PreviewChatBoxList from "../threadsListing/PreviewChatBoxList";

export function LeftChatPanel() {
  return (
    <div className="flex h-full grow flex-col justify-start space-y-7">
      <div className="flex w-full items-center justify-between px-2">
        <Link href={"/"}>
          <p className="text-xl font-bold text-[#1DAA61] dark:text-white">
            Whatsapp
          </p>
        </Link>
        <BubbleIcon Icon={MoreVertical} variant={"gray"} />
      </div>
      <ScrollArea className="h-[700px] w-full whitespace-nowrap">
        <PreviewChatBoxList />
      </ScrollArea>
    </div>
  );
}
