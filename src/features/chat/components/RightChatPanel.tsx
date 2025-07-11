"use client";
import React from "react";
import { ChatPanelPlaceHolder } from "./ChatPanelPlaceholder";
import { ChatThread } from "./ChatThread";
import { useChatStore } from "../hooks/useChatStore";
export function RightChatPanel() {
  const currentThreadId = useChatStore((state) => state.currentThreadId);

  if (currentThreadId == "placeholder") {
    return <ChatPanelPlaceHolder />;
  }

  return <ChatThread />;
}
