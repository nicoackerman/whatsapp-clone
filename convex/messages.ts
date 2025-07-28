import { ConvexError, v } from "convex/values";
import { internalQuery, mutation, query, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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

const getLastMessageOfChannel = async (
  ctx: QueryCtx,
  channelIdentifier: Id<"channels">,
) => {
  const lastMessage = await ctx.db
    .query("messages")
    .withIndex("by_channelIdentifier", (q) =>
      q.eq("channelIdentifier", channelIdentifier),
    )
    .order("desc")
    .take(1);
  return lastMessage[0];
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

export const getByChannel = query({
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

export const getLastMessage = internalQuery({
  args: { channelIdentifier: v.id("channels") },
  async handler(ctx, args) {
    await getAuthenticathedUser(ctx);

    const lastMessage = await getLastMessageOfChannel(
      ctx,
      args.channelIdentifier,
    );
    return lastMessage;
  },
});
