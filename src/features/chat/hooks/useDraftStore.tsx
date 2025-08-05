import { create } from "zustand";
import type { Channel, Message } from "~/features/channels/types";

export type Drafts = Partial<Record<Channel["_id"], Message["content"]>>;
interface DraftStoreSchema {
  drafts: Drafts;
  set: (channelIdentifier: Channel["_id"], content: Message["content"]) => void;
  delete: (channelIdentifier: Channel["_id"]) => void;
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
