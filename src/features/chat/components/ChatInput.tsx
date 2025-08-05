"use client";

import React from "react";
import useMessager from "../hooks/useMessager";
import type { MessageContent } from "~/types";
import { ArrowRight, SendIcon, StickerIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Theme, type PickerProps } from "emoji-picker-react";
import { Skeleton } from "~/components/ui/skeleton";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { BubbleAction } from "~/components/ui/bubble-action";
const EmojiPicker = lazy(() => import("emoji-picker-react"));

/* 
State manager
*/

interface ContextResources {
  messageContent: MessageContent;
  sendMessage: () => Promise<void>;
  setMessage: (content: MessageContent, concatenate?: boolean) => void;
}
const MessageComposerContext = React.createContext<ContextResources>({
  messageContent: "",
  sendMessage: async () => {},
  setMessage: () => {},
});

interface MessageComposerProviderProps {
  children: React.ReactNode;
}

function MessageComposerProvider({ children }: MessageComposerProviderProps) {
  const { sendMessage, setMessage, messageContent } = useMessager();

  const contextResources = React.useMemo<ContextResources>(() => {
    return {
      sendMessage,
      setMessage,
      messageContent,
    };
  }, [messageContent, setMessage, sendMessage]);
  return (
    <MessageComposerContext.Provider
      children={children}
      value={contextResources}
    />
  );
}

const useMessageComponser = () => {
  const ctx = React.useContext(MessageComposerContext);
  if (ctx === null)
    throw new Error(
      "useMessageComponser must be inside MessageComposerProvider",
    );
  return ctx;
};

/* 
Compound components
*/

export function ChatInput({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { messageContent, setMessage, sendMessage } = useMessageComponser();
  return (
    <MessageComposerProvider>
      <div className="bg-transparent px-2 py-4">
        <div
          className="flex w-full items-center gap-2 rounded-full bg-white px-4 py-1 dark:bg-[#1e2020]"
          {...props}
        />
      </div>
    </MessageComposerProvider>
  );
}

ChatInput.Left = function Left({ ...props }: React.ComponentProps<"div">) {
  return <div className="" {...props} />;
};

ChatInput.Right = function Right({ ...props }: React.ComponentProps<"div">) {
  return <div className="" {...props} />;
};

ChatInput.SendButton = function SendButton({
  ...props
}: React.ComponentProps<"button">) {
  return (
    <BubbleAction
      Icon={ArrowRight}
      className="size-8 rounded-full bg-green-600 text-white"
      {...props}
    />
  );
};

ChatInput.TypingBar = function TypingBar({
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input {...props} className="border-none" placeholder="type your message" />
  );
};

ChatInput.EmojiPicker = function EmojiPickerButton(props: PickerProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <BubbleIcon variant="gray" Icon={StickerIcon} />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="border-transparent bg-transparent"
      >
        <Suspense
          fallback={
            <div className="p-2">
              <Skeleton className="h-[400px] w-[600px] rounded-md" />
            </div>
          }
        >
          <EmojiPicker {...props} theme={Theme.DARK} />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
};
