import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, QueryCtx } from "./_generated/server";

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

export const create = internalMutation({
  args: { channelIdentifier: v.id("channels") },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);
    const id = await ctx.db.insert("userChannels", {
      userIdentifier: user._id,
      channelIdentifier: args.channelIdentifier,
    });
    return id;
  },
});

export const get = internalQuery({
  async handler(ctx) {
    const { user } = await getAuthenticathedUser(ctx);

    let channels = await ctx.db
      .query("userChannels")
      .withIndex("by_userIdentifier", (q) => q.eq("userIdentifier", user._id))
      .collect();
    return channels;
  },
});
