import { create } from "zustand";

type ThreadId = string;
interface ChatStoreSchema {
  currentThreadId: ThreadId;
  setThreadId: (newThreadId: ThreadId) => void;
}

const useChatStore = create<ChatStoreSchema>((set) => ({
  currentThreadId: "placeholder",
  setThreadId(newThreadId) {
    set({ currentThreadId: newThreadId });
  },
}));

export { type ThreadId, useChatStore };
