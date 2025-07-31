import type { Id } from "@/convex/_generated/dataModel";
import { useDraftStore, type Drafts } from "../hooks/useDraftStore";
import type { Message } from "../types";

export function getChannelDraft(channelIdentifier: Id<"channels">) {
  const drafts: Drafts = useDraftStore.getState().drafts;
  const draft: Message["content"] | undefined =
    channelIdentifier !== "placeholder" ? drafts[channelIdentifier] : undefined;
  return draft;
}
