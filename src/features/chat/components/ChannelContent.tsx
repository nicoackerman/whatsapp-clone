"use client";

import { api } from "@/convex/_generated/api";
import { useConvexAuth, useQuery } from "convex/react";
import { ChatContent, MessageList } from "./ui/ChatContent";
import { useChatStore } from "~/features/messages/hooks/useChatStore";
import type { ChannelIdentifier } from "~/types";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

export function useChannelMessages() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const channelIdentifer = useChatStore(
    (state) => state.currentChannelIdentifier,
  ) as ChannelIdentifier;
  const messages = useQuery(
    api.channels.getMessages,
    isLoading || !isAuthenticated
      ? "skip"
      : {
          channelIdentifier: channelIdentifer,
        },
  );

  const loading = isLoading && !messages;
  return { loading, messages };
}
export default function ChannelContent() {
  const { loading, messages } = useChannelMessages();

  if (loading || !messages) {
    return (
      <ChatContent>
        <LoadingSpinner />
      </ChatContent>
    );
  }

  return (
    <ChatContent>
      <MessageList messages={messages} />
    </ChatContent>
  );
}
