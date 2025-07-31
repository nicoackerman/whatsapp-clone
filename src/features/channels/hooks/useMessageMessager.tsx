"use client";

import React from "react";
import type { Message } from "../types";
import { useDraftStore } from "./useDraftStore";
import { useChatStore } from "~/features/messages/hooks/useChatStore";
import type { Id } from "@/convex/_generated/dataModel";
import { getChannelDraft } from "../lib";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

/*
    This hook is used for handeling message events like: send, set, useDraft
*/
export default function useMessager() {
  /*
    State used for automatic identification of the current channel on viwew
  */
  const [_messageContent, setMessageContent] =
    React.useState<Message["content"]>("");
  const channelIdentifier = useChatStore(
    (state) => state.currentChannelIdentifier,
  ) as Id<"channels">;
  const createMessage = useMutation(api.messages.create);

  /* 
    Draft methods for storaging stateless message content as drafts
  */
  const draft = getChannelDraft(channelIdentifier);
  let messageContent: Message["content"] = draft ? draft : _messageContent;

  const setDraft = useDraftStore((state) => state.set);
  const deleteDraft = useDraftStore((state) => state.delete);

  /* 
    Messager methods: these handle the input state and stateless draft memory
  */
  const sendMessage = React.useCallback(async () => {
    deleteDraft(channelIdentifier);
    await createMessage({ channelIdentifier, content: messageContent });
  }, [messageContent, deleteDraft, createMessage, channelIdentifier]);
  const setMessage = React.useCallback(
    (content: Message["content"], concatenate: boolean = false) => {
      if (concatenate) {
        const fullContent = messageContent + content;
        setMessageContent(fullContent);
        setDraft(channelIdentifier, fullContent);
      } else {
        setMessageContent(content);
        setDraft(channelIdentifier, content);
      }
    },
    [setMessageContent, channelIdentifier, setDraft, messageContent],
  );

  return { messageContent, setMessage, sendMessage };
}
