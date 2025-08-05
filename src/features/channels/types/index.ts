import type { Doc, Id } from "convex/_generated/dataModel";
import type { Preview } from "convex/threads";

export type ThreadSummary = Preview;
export type Channel = Doc<"channels">;
export type Message = Doc<"messages">;
export type User = Doc<"users">;
export type ChannelIdentifier = "placeholder" | Id<"channels">;
