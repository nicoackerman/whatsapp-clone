import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useChatStore, type ThreadId } from "../hooks/useChatStore";
import clsx from "clsx";

interface PreviewChatBoxProps {
  threadId: ThreadId;
}

export function PreviewChatBox(props: PreviewChatBoxProps) {
  const setThreadId = useChatStore((state) => state.setThreadId);
  const currentThreadId = useChatStore((state) => state.currentThreadId);
  const threadId = props.threadId;

  const isCurrentChat = currentThreadId == threadId;
  const activeClass = isCurrentChat ? "bg-gray-200/10" : "bg-transparent";
  const baseClass =
    "cursor-pointer flex items-center justify-between gap-3 bg-transparent p-4 hover:bg-gray-200/10 dark:text-white h-14";

  return (
    <Button
      className={clsx(baseClass, activeClass)}
      onClick={() => {
        setThreadId(threadId);
      }}
    >
      <Avatar className="size-10">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex grow flex-col items-start">
        <h3 className="text-base font-bold">Felipe</h3>
        <p className="line-clamp-1">I just asked bla bla</p>
      </div>
    </Button>
  );
}
