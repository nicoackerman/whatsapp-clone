import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    profileImg: v.string(),
    firstName: v.string(),
    lastName: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  channels: defineTable({
    type: v.union(v.literal("thread"), v.literal("server")),
  }).index("by_type", ["type"]),

  servers: defineTable({
    channelIdentifier: v.id("channels"),
    name: v.string(),
    imageUrl: v.string(),
  })
    .index("by_channelIdentifier", ["channelIdentifier"])
    .index("by_name", ["name"]),

  threads: defineTable({
    channelIdentifier: v.id("channels"),
  }).index("by_channelIdentifier", ["channelIdentifier"]),

  messages: defineTable({
    content: v.string(),
    senderIdentifier: v.id("users"),
    channelIdentifier: v.id("channels"),
  })
    .index("by_senderIdentifier", ["senderIdentifier"])
    .index("by_channelIdentifier", ["channelIdentifier"]),

  userChannels: defineTable({
    userIdentifier: v.id("users"),
    channelIdentifier: v.id("channels"),
  }).index("by_userIdentifier", ["userIdentifier"]),
});
