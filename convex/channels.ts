import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, QueryCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const create = internalMutation({
  args: {
    type: v.union(v.literal("thread"), v.literal("server")),
    receiversIdentifier: v.array(v.id("users")),
  },
  async handler(ctx, args) {
    await getAuthenticathedUser(ctx);
    const channelIdentifier = await ctx.db.insert("channels", {
      type: args.type,
    });
    const relationIdentifiers = await ctx.runMutation(
      internal.userChannels.create,
      {
        channelIdentifier: channelIdentifier,
        receiversIdentifier: args.receiversIdentifier,
      },
    );
    return channelIdentifier;
  },
});

export const get = internalQuery({
  async handler(ctx) {
    await getAuthenticathedUser(ctx);

    const channelRefs: Doc<"userChannels">[] = await ctx.runQuery(
      internal.userChannels.get,
    );
    const channels: Doc<"channels">[] = await Promise.all(
      channelRefs.map(async (channelRef) => {
        const channel = await ctx.db.get(channelRef.channelIdentifier);
        if (!channel) throw new ConvexError("Bad reference at userChannels");
        return channel;
      }),
    );

    return channels;
  },
});

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
