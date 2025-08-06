import { create } from "zustand";
import type { ChannelIdentifier } from "~/types";

export type oldChannelIdentifier = ChannelIdentifier | "placeholder";

interface ChatStoreSchema {
  currentChannelIdentifier: ChannelIdentifier | "placeholder";
  setThreadId: (channelIdentifier: ChannelIdentifier) => void;
}

const useChatStore = create<ChatStoreSchema>((set) => ({
  currentChannelIdentifier: "placeholder",
  setThreadId(newChannelIdentifier) {
    set({ currentChannelIdentifier: newChannelIdentifier });
  },
}));

export { useChatStore };
