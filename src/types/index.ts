import type { Doc } from "@/convex/_generated/dataModel";

export type ChannelDoc = Doc<"channels">;
export type ChannelIdentifier = ChannelDoc["_id"];
export type ChannelType = ChannelDoc["type"];

export type MessageDoc = Doc<"messages">;
export type MessageIdentifier = MessageDoc["_id"];
export type MessageContent = MessageDoc["content"];
