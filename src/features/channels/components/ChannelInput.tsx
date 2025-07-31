"use client";
import { SendIcon } from "lucide-react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import EmojiPickerUI from "./EmojiPickerUI";
import { useMessageComponser } from "../hooks/useMessageComposer";
import type { Message } from "../types";

export default function MessageInput({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { sendMessage, setMessage, messageContent } = useMessageComponser();
  const handleClick = async () => {
    // Reads the input data in the background using messageComponser
    sendMessage();
    console.log("enviado");
  };
  const handleChange = (content: Message["content"]) => {
    void setMessage(content);
  };
  const handleEmojiEvent = (content: Message["content"]) => {
    void setMessage(content, true);
  };
  return (
    <div className="bg-transparent px-2 py-4">
      <div className={cn("flex w-full justify-between", className)} {...props}>
        <EmojiPickerUI
          lazyLoadEmojis
          width={600}
          height={400}
          onEmojiClick={(eomji) => {
            handleEmojiEvent(eomji.emoji);
          }}
        />

        <Input
          placeholder="Type a message"
          className="w-full border-none bg-transparent text-white focus:ring-0 focus:outline-none"
          onChange={(e) => handleChange(e.target.value)}
          value={messageContent}
        />

        <BubbleIcon
          variant="green"
          Icon={SendIcon}
          onClick={() => {
            handleClick();
          }}
        />
      </div>
    </div>
  );
}
