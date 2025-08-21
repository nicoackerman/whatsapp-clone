"use client";
import React from "react";
import ChannelSummaryUI from "./ChannelSummaryUI";
import type { ChannelIdentifier } from "~/types";
import type { ChannelSummary } from "@/convex/types";
import { useChatStore } from "~/features/messages/hooks/useChatStore";

interface ChannelSummaryWrapperProps {
  summary: ChannelSummary;
}

export default function ChannelSummaryWrapper({
  summary,
}: ChannelSummaryWrapperProps) {
  const setThreadId = useChatStore((state) => state.setThreadId);
  const currentChannelIdentifier: ChannelIdentifier | "placeholder" =
    useChatStore((state) => state.currentChannelIdentifier);

  const { channelIdentifier, profileImgUrl, channelName } = summary;

  const isCurrentChat = currentChannelIdentifier == channelIdentifier;
  const lastMessage = summary.lastMessage
    ? summary.lastMessage.content
    : "No messages yet...";

  return (
    <ChannelSummaryUI
      channelIdentifier={channelIdentifier}
      onView={isCurrentChat}
      profileImg={profileImgUrl}
      lastMessage={lastMessage}
      channelName={channelName}
      setAsCurrentThread={setThreadId}
    />
  );
}
