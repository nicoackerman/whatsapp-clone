import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    userId: v.string(),
    content: v.string(),
    type: v.union(v.literal("text"), v.literal("image"), v.literal("file")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      userId: args.userId,
      content: args.content,
      type: args.type,
      wasEliminated: false,
    });
  },
});

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("messages").order("desc").take(10);
    return messages.reverse();
  },
});
