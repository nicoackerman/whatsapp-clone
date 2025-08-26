import { create } from "zustand";
import type { ChannelIdentifier, UserIdentifier } from "~/types";

export type oldChannelIdentifier = ChannelIdentifier | "placeholder";

interface ChatStoreSchema {
  currentChannelIdentifier: ChannelIdentifier | "placeholder";
  currentRecieverIdentifier: UserIdentifier | "placeholder";
  setThreadId: (channelIdentifier: ChannelIdentifier) => void;
  setReciever: (newChannelReciever: UserIdentifier) => void;
}

const useChatStore = create<ChatStoreSchema>((set) => ({
  currentChannelIdentifier: "placeholder",
  currentRecieverIdentifier: "placeholder",
  setThreadId(newChannelIdentifier) {
    set({ currentChannelIdentifier: newChannelIdentifier });
  },
  setReciever(newChannelReciever) {
    set({ currentRecieverIdentifier: newChannelReciever });
  },
}));

export { useChatStore };
