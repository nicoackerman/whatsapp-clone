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

export const get = query({
  async handler(ctx) {
    await getAuthenticathedUser(ctx);

    const allChannels: Doc<"channels">[] = await ctx.runQuery(
      internal.channels.get,
    );
    const serverChannels = allChannels.filter(
      (channel) => channel.type == "server",
    );
    const servers: Doc<"servers">[] = await Promise.all(
      serverChannels.map(async (serverChannel) => {
        const channel = await ctx.db
          .query("servers")
          .filter((q) => q.eq(q.field("channelIdentifier"), serverChannel._id))
          .unique();
        if (!channel) throw new ConvexError("Bad reference at userChannels");
        return channel;
      }),
    );

    return servers;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
    receiverIdentifiers: v.array(v.id("users")),
  },
  async handler(ctx, args) {
    await getAuthenticathedUser(ctx);

    const channelIdentifier = (await ctx.runMutation(internal.channels.create, {
      type: "server",
      receiversIdentifier: args.receiverIdentifiers,
    })) as Id<"channels">;
    const serverIdentifier = await ctx.db.insert("servers", {
      channelIdentifier: channelIdentifier,
      name: args.name,
      imageUrl: args.imageUrl,
    });
    return serverIdentifier;
  },
});
