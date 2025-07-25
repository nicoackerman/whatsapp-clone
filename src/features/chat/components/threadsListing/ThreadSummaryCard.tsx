import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import clsx from "clsx";
import type { Channel, ThreadSummary } from "../../types";

interface ThreaddSummaryProps {
  onView: boolean;
  summary: ThreadSummary;
  setAsCurrentThread: (newThreadId: Channel["_id"]) => void;
}

export default function ThreadSummaryCard({
  onView,
  summary,
  setAsCurrentThread,
}: ThreaddSummaryProps) {
  const activeClass = onView ? "bg-ghost-gray" : "bg-transparent";
  const baseClass =
    "cursor-pointer flex items-center justify-between gap-3 bg-transparent p-4 hover:bg-ghost-gray dark:text-white h-15";
  const { profileImg, firstName } = summary.user;
  const { content } = summary.lastMessage;

  return (
    <Button
      className={clsx(baseClass, activeClass)}
      onClick={() => {
        setAsCurrentThread(summary.channelIdentifier);
      }}
    >
      <Avatar className="size-10">
        <AvatarImage src={profileImg} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex grow flex-col items-start">
        <h3 className="text-base dark:text-white">{firstName}</h3>
        <span className="text-soft-gray dark:text-soft-white line-clamp-1">
          {content}
        </span>
      </div>
    </Button>
  );
}
