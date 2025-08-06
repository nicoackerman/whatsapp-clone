import type { Id } from "@/convex/_generated/dataModel";
import { useDraftStore, type Drafts } from "../hooks/useDraftStore";
import type { MessageContent } from "~/types";

export function getChannelDraft(channelIdentifier: Id<"channels">) {
  const drafts: Drafts = useDraftStore.getState().drafts;
  const draft: MessageContent | undefined =
    channelIdentifier !== "placeholder" ? drafts[channelIdentifier] : undefined;
  return draft;
}
