// Should this be server?
import React from "react";
import { useChatStore } from "../../hooks/useChatStore";
import type { ThreadSummary } from "../../types";
import ThreadSummaryCard from "./ThreadSummaryCard";

interface PreviewChatBoxProps {
  summary: ThreadSummary;
}

export function PreviewChatBox(props: PreviewChatBoxProps) {
  const setThreadId = useChatStore((state) => state.setThreadId);
  const currentChannelIdentifier = useChatStore(
    (state) => state.currentChannelIdentifier,
  );

  const summary = props.summary;
  const isCurrentChat = currentChannelIdentifier == summary.channelIdentifier;

  return (
    <ThreadSummaryCard
      onView={isCurrentChat}
      summary={summary}
      setAsCurrentThread={setThreadId}
    />
  );
}
