"use client";
import React from "react";
import MessagesPanelPlaceHolder from "./MessagesPanelPlaceholder";
import ChannelDisplay from "~/features/chat/components/ChannelDisplay";
import { useChatStore } from "../hooks/useChatStore";
import type { ChannelIdentifier } from "~/types";

export function RightChatPanel() {
  const currentThreadId: ChannelIdentifier | "placeholder" = useChatStore(
    (state) => state.currentChannelIdentifier,
  );

  if (currentThreadId == "placeholder") {
    return <MessagesPanelPlaceHolder />;
  }

  return <ChannelDisplay />;
}
