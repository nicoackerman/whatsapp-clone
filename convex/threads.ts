import { ConvexError, v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

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
  args: { receiverIdentifier: v.id("users") },
  async handler(ctx, args) {
    await getAuthenticathedUser(ctx);

    const channelIdentifier = (await ctx.runMutation(internal.channels.create, {
      type: "thread",
      receiversIdentifier: [args.receiverIdentifier],
    })) as Id<"channels">;
    const threadIdentifier = await ctx.db.insert("threads", {
      channelIdentifier: channelIdentifier,
    });
    return threadIdentifier;
  },
});

export const get = query({
  async handler(ctx) {
    await getAuthenticathedUser(ctx);

    const allChannels: Doc<"channels">[] = await ctx.runQuery(
      internal.channels.get,
    );
    const threadChannels = allChannels.filter(
      (channel) => channel.type == "thread",
    );

    const threads: Doc<"threads">[] = await Promise.all(
      threadChannels.map(async (threadChannel) => {
        const thread = await ctx.db
          .query("threads")
          .filter((q) => q.eq(q.field("channelIdentifier"), threadChannel._id))
          .unique();
        if (!thread) throw new ConvexError("Bad reference at userChannels");
        return thread;
      }),
    );
    return threads;
  },
});
