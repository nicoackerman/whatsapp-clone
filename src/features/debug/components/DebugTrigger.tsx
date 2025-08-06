"use client";
import { useChatStore } from "~/features/messages/hooks/useChatStore";
import { ChatDebugger } from "./ChatDebugger";
import type { ChannelIdentifier } from "~/types";
import {
  useDraftStore,
  type Drafts,
} from "~/features/chat/hooks/useDraftStore";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function useDebugChat() {
  const channelIdentifier: ChannelIdentifier = useChatStore(
    (state) => state.currentChannelIdentifier,
  ) as ChannelIdentifier;
  const drafts: Drafts = useDraftStore((state) => state.drafts);
  const { isLoading, isAuthenticated } = useConvexAuth();
  const messages = useQuery(
    api.channels.getMessages,
    isLoading || !isAuthenticated
      ? "skip"
      : {
          channelIdentifier: channelIdentifier,
        },
  );
  return {
    channelIdentifier,
    drafts,
    messages: messages,
  };
}

export default function DebugTrigger() {
  const { channelIdentifier, drafts, messages } = useDebugChat();
  return (
    <ChatDebugger>
      <ChatDebugger.Top>
        <ChatDebugger.Indicator>
          <ChatDebugger.Block name="currentChannel" data={channelIdentifier} />
        </ChatDebugger.Indicator>
        <ChatDebugger.Indicator>
          <ChatDebugger.Block
            name="currentDraft"
            data={drafts[channelIdentifier]}
          />
        </ChatDebugger.Indicator>
        <ChatDebugger.Indicator>
          <ChatDebugger.Block name="drafts" data={drafts} />
        </ChatDebugger.Indicator>
        <ChatDebugger.Indicator>
          <ChatDebugger.Block name="messages" data={messages} />
        </ChatDebugger.Indicator>
      </ChatDebugger.Top>
      <ChatDebugger.Bottom></ChatDebugger.Bottom>
    </ChatDebugger>
  );
}
