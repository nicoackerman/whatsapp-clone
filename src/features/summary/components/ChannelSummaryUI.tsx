"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import clsx from "clsx";
import { UserAvatar } from "~/components/ui/user-avatar";
import type { ChannelIdentifier } from "~/types";

interface ChannelSummaryProps {
  onView: boolean;
  profileImg: string;
  userName: string;
  lastMessage: string;
  channelIdentifier: ChannelIdentifier;
  setAsCurrentThread: (newThreadId: ChannelIdentifier) => void;
}

export default function ChannelSummaryUI({
  onView,
  profileImg,
  userName,
  lastMessage,
  channelIdentifier,
  setAsCurrentThread,
}: ChannelSummaryProps) {
  const baseStyles =
    "cursor-pointer flex items-center justify-between gap-3 p-4 h-15 hover:bg-ghost-gray dark:text-white";
  const activeStyles = onView ? "bg-ghost-gray" : "bg-transparent";

  const handleClick = () => {
    setAsCurrentThread(channelIdentifier);
  };

  return (
    <Button className={clsx(baseStyles, activeStyles)} onClick={handleClick}>
      <UserAvatar
        className="size-10"
        userName={userName}
        profileImg={profileImg}
      />
      <div className="flex grow flex-col items-start overflow-hidden text-left">
        <h3 className="text-base font-medium">{userName}</h3>
        <p className="text-soft-gray dark:text-soft-white line-clamp-1 text-sm">
          {lastMessage}
        </p>
      </div>
    </Button>
  );
}
