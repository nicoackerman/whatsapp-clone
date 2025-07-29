"use client";
import React from "react";
import MessagesPanelPlaceHolder from "./MessagesPanelPlaceholder";
import ChannelDisplay from "~/features/channels/components/ChannelDisplay";
import { useChatStore } from "../hooks/useChatStore";

export function RightChatPanel() {
  const currentThreadId = useChatStore(
    (state) => state.currentChannelIdentifier,
  );

  if (currentThreadId == "placeholder") {
    return <MessagesPanelPlaceHolder />;
  }

  return <ChannelDisplay />;
}
