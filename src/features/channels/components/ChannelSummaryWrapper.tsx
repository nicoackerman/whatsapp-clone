"use client";
import React from "react";
import { useChatStore } from "../../messages/hooks/useChatStore";
import type { ThreadSummary } from "../types";
import ChannelSummaryUI from "./ChannelSummaryUI";

interface ChannelSummaryWrapperProps {
  summary: ThreadSummary;
}

export default function ChannelSummaryWrapper({
  summary,
}: ChannelSummaryWrapperProps) {
  const setThreadId = useChatStore((state) => state.setThreadId);
  const currentChannelIdentifier = useChatStore(
    (state) => state.currentChannelIdentifier,
  );

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
