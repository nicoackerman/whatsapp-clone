"use client";
import React from "react";
import { ChatPanelPlaceHolder } from "./ChatPanelPlaceholder";
import { ChatThread } from "./ChatThread";

export function RightChatPanel() {
  const selectedConversation = 1;

  if (!selectedConversation) {
    return <ChatPanelPlaceHolder />;
  }

  return <ChatThread conversationId={selectedConversation} />;
}
