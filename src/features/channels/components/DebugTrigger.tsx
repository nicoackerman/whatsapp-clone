"use client";
import { useChatStore } from "~/features/messages/hooks/useChatStore";
import {
  ChatDebugger,
  ChatDebuggerBlock,
  ChatDebuggerBottom,
  ChatDebuggerIndicator,
  ChatDebuggerTitle,
  ChatDebuggerTop,
} from "./debug";
import type { ChannelIdentifier } from "~/types";
import { useDraftStore, type Drafts } from "../hooks/useDraftStore";

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

export default function DebugTrigger({}: {}) {
  const { channelIdentifier, drafts } = useDebugChat();
  return (
    <ChatDebugger>
      <ChatDebuggerTop>
        <ChatDebuggerIndicator>
          <ChatDebuggerTitle>Current Channel Identifier:</ChatDebuggerTitle>
          <ChatDebuggerBlock
            name="ChannelIdentifier"
            data={channelIdentifier}
          />
        </ChatDebuggerIndicator>
        <ChatDebuggerIndicator>
          <ChatDebuggerTitle>Current Draft Identifier</ChatDebuggerTitle>
          <ChatDebuggerBlock name="drafts" data={drafts[channelIdentifier]} />
        </ChatDebuggerIndicator>
        <ChatDebuggerIndicator>
          <ChatDebuggerTitle>All Drafts</ChatDebuggerTitle>
          <ChatDebuggerBlock name="drafts" data={drafts} />
        </ChatDebuggerIndicator>
      </ChatDebuggerTop>
      <ChatDebuggerBottom></ChatDebuggerBottom>
    </ChatDebugger>
  );
}
