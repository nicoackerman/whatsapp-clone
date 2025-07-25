import { create } from "zustand";
import type { Channel } from "../types";

interface ChatStoreSchema {
  currentChannelIdentifier: Channel["_id"] | "placeholder";
  setThreadId: (channelIdentifier: Channel["_id"]) => void;
}

const useChatStore = create<ChatStoreSchema>((set) => ({
  currentChannelIdentifier: "placeholder",
  setThreadId(newChannelIdentifier) {
    set({ currentChannelIdentifier: newChannelIdentifier });
  },
}));

export { useChatStore };
