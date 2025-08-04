import type { Doc } from "@/convex/_generated/dataModel"

export type ChannelDoc = Doc<"channels">
export type ChannelIdentifier = ChannelDoc["_id"];
export type ChannelType = ChannelDoc["type"];  