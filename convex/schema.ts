import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  thread: defineTable({
    participants: v.array(v.id("users")),
    messages: v.array(v.id("messages")),
    lastMessage: v.id("messages"),
  }).index("by_participants", ["participants"]),
  messages: defineTable({
    type: v.union(v.literal("text")),
    content: v.string(),
    sender: v.id("users"),
    threadIdentifier: v.id("thread"),
  }).index("by_threadIdentifier", ["threadIdentifier"]),
  users: defineTable({
    profileImg: v.string(),
    fullName: v.string(),
    contacts: v.array(v.id("users")),
    tokenIdentifier: v.string(),
    isOnline: v.boolean(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
