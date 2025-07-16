import { create } from "zustand";
import { threads, type Thread } from "../components/dummy-data";

type ThreadId = string;
interface ChatStoreSchema {
  currentThreadId: ThreadId;
  currentThreadMeta: Thread | null;
  setThreadId: (newThreadId: ThreadId) => void;
}

const useChatStore = create<ChatStoreSchema>((set) => ({
  currentThreadId: "placeholder",
  currentThreadMeta: null,
  setThreadId(newThreadId) {
    const newThreadMeta = threads.find((t: Thread) => t._id == newThreadId) as Thread;
    set({ currentThreadId: newThreadId, currentThreadMeta: newThreadMeta });
  },
}));

export { type ThreadId, useChatStore };
