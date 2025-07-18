import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useChatStore } from "../hooks/useChatStore";
import clsx from "clsx";
import type { Thread } from "./dummy-data";

interface PreviewChatBoxProps {
  thread: Thread;
}

export function PreviewChatBox(props: PreviewChatBoxProps) {
  const setThreadId = useChatStore((state) => state.setThreadId);
  const currentThreadId = useChatStore((state) => state.currentThreadId);

  const thread = props.thread;
  const threadId = thread._id;

  const isCurrentChat = currentThreadId == threadId;
  const activeClass = isCurrentChat ? "bg-ghost-gray" : "bg-transparent";
  const baseClass =
    "cursor-pointer flex items-center justify-between gap-3 bg-transparent p-4 hover:bg-ghost-gray dark:text-white h-15";

  return (
    <Button
      className={clsx(baseClass, activeClass)}
      onClick={() => {
        setThreadId(threadId);
      }}
    >
      <Avatar className="size-10">
        <AvatarImage src={thread.threadImage} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex grow flex-col items-start">
        <h3 className="text-base dark:text-white">{thread.threadName}</h3>
        <span className="text-soft-gray dark:text-soft-white line-clamp-1">
          {thread.lastMessage.content}
        </span>
      </div>
    </Button>
  );
}
