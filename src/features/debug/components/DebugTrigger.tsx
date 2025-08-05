"use client";
import { useChatStore } from "~/features/messages/hooks/useChatStore";
import { ChatDebugger } from "./ChatDebugger";
import type { ChannelIdentifier } from "~/types";
import {
  useDraftStore,
  type Drafts,
} from "~/features/chat/hooks/useDraftStore";

function useDebugChat() {
  const channelIdentifier: ChannelIdentifier = useChatStore(
    (state) => state.currentChannelIdentifier,
  ) as ChannelIdentifier;
  const drafts: Drafts = useDraftStore((state) => state.drafts);
  return {
    channelIdentifier,
    drafts,
  };
}

export default function DebugTrigger() {
  const { channelIdentifier, drafts } = useDebugChat();
  return (
    <ChatDebugger>
      <ChatDebugger.Top>
        <ChatDebugger.Indicator>
          <ChatDebugger.Title>Current Channel Identifier:</ChatDebugger.Title>
          <ChatDebugger.Block
            name="ChannelIdentifier"
            data={channelIdentifier}
          />
        </ChatDebugger.Indicator>
        <ChatDebugger.Indicator>
          <ChatDebugger.Title>Current Draft Identifier</ChatDebugger.Title>
          <ChatDebugger.Block name="drafts" data={drafts[channelIdentifier]} />
        </ChatDebugger.Indicator>
        <ChatDebugger.Indicator>
          <ChatDebugger.Title>All Drafts</ChatDebugger.Title>
          <ChatDebugger.Block name="drafts" data={drafts} />
        </ChatDebugger.Indicator>
      </ChatDebugger.Top>
      <ChatDebugger.Bottom></ChatDebugger.Bottom>
    </ChatDebugger>
  );
}
