"use client";
import React from "react";
import { useChatStore } from "../../messages/hooks/useChatStore";
import ChannelSummaryUI from "./ChannelSummaryUI";
import type { ChannelIdentifier } from "~/types";
import type { Preview } from "@/convex/threads";

interface ChannelSummaryWrapperProps {
  summary: Preview;
}

export default function ChannelSummaryWrapper({
  summary,
}: ChannelSummaryWrapperProps) {
  const setThreadId = useChatStore((state) => state.setThreadId);
  const currentChannelIdentifier: ChannelIdentifier | "placeholder" =
    useChatStore((state) => state.currentChannelIdentifier);

  const { channelIdentifier, user: reciver } = summary;
  const { profileImg, firstName } = reciver;

  const isCurrentChat = currentChannelIdentifier == channelIdentifier;
  const lastMessage = summary.lastMessage
    ? summary.lastMessage.content
    : "No messages yet...";

  return (
    <ChannelSummaryUI
      channelIdentifier={channelIdentifier}
      onView={isCurrentChat}
      profileImg={profileImg}
      lastMessage={lastMessage}
      userName={firstName}
      setAsCurrentThread={setThreadId}
    />
  );
}
