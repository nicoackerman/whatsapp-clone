import type { Doc } from "@/convex/_generated/dataModel";
import type { Messages } from "@/convex/channels";

export type ChannelDoc = Doc<"channels">;
export type ChannelIdentifier = ChannelDoc["_id"];
export type ChannelType = ChannelDoc["type"];

export type MessageDoc = Messages;
export type MessageIdentifier = MessageDoc["_id"];
export type MessageContent = MessageDoc["content"];

export type UserDoc = Doc<"users">;
export type UserIdentfier = UserDoc["_id"];
