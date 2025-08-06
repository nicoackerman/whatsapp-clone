import { create } from "zustand";
import type { ChannelIdentifier, MessageContent } from "~/types";

export type Drafts = Partial<Record<ChannelIdentifier, MessageContent>>;
interface DraftStoreSchema {
  drafts: Drafts;
  set: (channelIdentifier: ChannelIdentifier, content: MessageContent) => void;
  delete: (channelIdentifier: ChannelIdentifier) => void;
}

const useDraftStore = create<DraftStoreSchema>((set) => ({
  drafts: {} as Drafts,
  set(channelIdentifier, content) {
    set((state) => {
      const newDrafts = { ...state.drafts, [channelIdentifier]: content };
      return { drafts: newDrafts };
    });
  },
  delete(channelIdentifier) {
    set((state) => {
      const newDrafts = { ...state.drafts };
      delete newDrafts[channelIdentifier];
      return { drafts: newDrafts };
    });
  },
}));

export { useDraftStore };
