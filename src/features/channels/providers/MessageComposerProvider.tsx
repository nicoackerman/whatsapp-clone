"use client";

import React from "react";
import type { Message } from "../types";
import useMessager from "../hooks/useMessageMessager";

interface ContextResources {
  messageContent: Message["content"];
  sendMessage: () => Promise<void>;
  setMessage: (content: Message["content"], concatenate?: boolean) => void;
}
export const MessageComposerContext = React.createContext<ContextResources>({
  messageContent: "",
  sendMessage: async () => {},
  setMessage: () => {},
});

interface MessageComposerProviderProps {
  children: React.ReactNode;
}

export default function MessageComposerProvider({
  children,
}: MessageComposerProviderProps) {
  const { sendMessage, setMessage, messageContent } = useMessager();

  const contextResources = React.useMemo<ContextResources>(() => {
    return {
      sendMessage,
      setMessage,
      messageContent,
    };
  }, [messageContent, setMessage, sendMessage]);
  return (
    <MessageComposerContext.Provider
      children={children}
      value={contextResources}
    />
  );
}
