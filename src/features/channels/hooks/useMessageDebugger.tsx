import { create } from "zustand";

interface MessageDebuggerSchema {
  open: boolean;
  toggle: () => void;
}

const useMessageDebugger = create<MessageDebuggerSchema>((set) => ({
  open: false,
  toggle() {
    set((state) => {
      return { open: !state.open };
    });
  },
}));

export { type MessageDebuggerSchema, useMessageDebugger };
