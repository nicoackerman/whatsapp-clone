import { create } from "zustand";
import type { Channel } from "~/features/channels/types";

export type ChannelIdentifier = Channel["_id"] | "placeholder";

interface ChatStoreSchema {
  currentChannelIdentifier: ChannelIdentifier;
  setThreadId: (channelIdentifier: Channel["_id"]) => void;
}

const useChatStore = create<ChatStoreSchema>((set) => ({
  currentChannelIdentifier: "placeholder",
  setThreadId(newChannelIdentifier) {
    set({ currentChannelIdentifier: newChannelIdentifier });
  },
}));

export { useChatStore };
