"use client";
import React from "react";
import { ChatPanelPlaceHolder } from "../threadsListing/ChatPanelPlaceholder";
import ChatThread from "../threadView/ChatThread";
import { useChatStore } from "../../hooks/useChatStore";

export function RightChatPanel() {
  const currentThreadId = useChatStore(
    (state) => state.currentChannelIdentifier,
  );

  if (currentThreadId == "placeholder") {
    return <ChatPanelPlaceHolder />;
  }

  return <ChatThread />;
}
