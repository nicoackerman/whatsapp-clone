import { ConvexError, v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";

const getAuthenticathedUser = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("Unauthorized");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .unique();

  if (!user) {
    throw new ConvexError("User not found");
  }

  return { user, identity };
};

export const create = mutation({
  args: {
    content: v.string(),
    channelIdentifier: v.id("channels"),
  },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);

    await ctx.db.insert("messages", {
      content: args.content,
      senderIdentifier: user._id,
      channelIdentifier: args.channelIdentifier,
    });
  },
});

export const get = query({
  args: { channelIdentifier: v.id("channels") },
  async handler(ctx, args) {
    const channelMessages = await ctx.db
      .query("messages")
      .withIndex("by_channelIdentifier", (q) =>
        q.eq("channelIdentifier", args.channelIdentifier),
      )
      .collect();
    return channelMessages;
  },
});
