"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import type { MessageDoc } from "~/types";
import ChatMessage from "./ChatMessage";

export function ChatContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center">
      {children}
    </div>
  );
}

export function MessageList({ messages }: { messages: MessageDoc[] }) {
  return (
    <ScrollArea className="size-full">
      {messages.map((message: MessageDoc) => (
        <ChatMessage key={message._id} message={message} />
      ))}
    </ScrollArea>
  );
}
