import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useChatStore, type ThreadId } from "../hooks/useChatStore";
import clsx from "clsx";
import type { Thread } from "./dummy-data";

interface PreviewChatBoxProps {
  thread: Thread;
}

interface ChatPreviewDisplay {
  onView: boolean;
  thread: Thread;
  setAsCurrentThread: (newThreadId: ThreadId) => void;
}

/* 
  Shows a preview box for a given chat
  * Gets the current thread based on state
  * Handles new thread by set thread state
  * Handles UI and dinamic styles based on state
*/

function ChatPreviewDisplay(props: ChatPreviewDisplay) {
  const activeClass = props.onView ? "bg-ghost-gray" : "bg-transparent";
  const baseClass =
    "cursor-pointer flex items-center justify-between gap-3 bg-transparent p-4 hover:bg-ghost-gray dark:text-white h-15";

  return (
    <Button
      className={clsx(baseClass, activeClass)}
      onClick={() => {
        props.setAsCurrentThread(props.thread._id);
      }}
    >
      <Avatar className="size-10">
        <AvatarImage src={props.thread.threadImage} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex grow flex-col items-start">
        <h3 className="text-base dark:text-white">{props.thread.threadName}</h3>
        <span className="text-soft-gray dark:text-soft-white line-clamp-1">
          {props.thread.lastMessage.content}
        </span>
      </div>
    </Button>
  );
}

export function PreviewChatBox(props: PreviewChatBoxProps) {
  const setThreadId = useChatStore((state) => state.setThreadId);
  const currentThreadId = useChatStore((state) => state.currentThreadId);

  const thread = props.thread;
  const isCurrentChat = currentThreadId == thread._id;

  return (
    <ChatPreviewDisplay
      onView={isCurrentChat}
      thread={thread}
      setAsCurrentThread={setThreadId}
    />
  );
}
