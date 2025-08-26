import type { Doc } from "@/convex/_generated/dataModel";
import type { EnrichedMessage } from "@/convex/types";
import type { ChannelSummary } from "@/convex/types";

export type ChannelDoc = Doc<"channels">;
export type ChannelIdentifier = ChannelDoc["_id"];
export type ChannelType = ChannelDoc["type"];

export type MessageDoc = EnrichedMessage;
export type MessageIdentifier = MessageDoc["_id"];
export type MessageContent = MessageDoc["content"];

export type UserDoc = Doc<"users">;
export type UserIdentifier = UserDoc["_id"];

export type ChannelPreview = ChannelSummary;
