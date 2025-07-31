import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
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

const createrRelationsFromList = async (
  ctx: MutationCtx,
  targets: Id<"users">[],
  channelIdentifier: Id<"channels">,
) => {
  const relationIdentifiers = await Promise.all(
    targets.map((t) =>
      ctx.db.insert("userChannels", {
        userIdentifier: t as Id<"users">,
        channelIdentifier,
      }),
    ),
  );
  return relationIdentifiers;
};

export const create = internalMutation({
  args: {
    channelIdentifier: v.id("channels"),
    recieversIdentifier: v.array(v.id("users")),
  },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);
    const targets = [user._id, ...args.recieversIdentifier];

    const relationIdentifiers = await createrRelationsFromList(
      ctx,
      targets,
      args.channelIdentifier,
    );
    return relationIdentifiers;
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

export const getRecieversByChannel = internalQuery({
  args: {
    channelIdentifier: v.id("channels"),
  },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);

    // Gets the channel and user relations by channel id
    let relationsFromChannel = await ctx.db
      .query("userChannels")
      .withIndex("by_channelIdentifier", (q) =>
        q.eq("channelIdentifier", args.channelIdentifier),
      )
      .collect();
    // Gets the channel and user relations that do not contain the current user (recievers)
    let channels = relationsFromChannel.filter(
      (relation: Doc<"userChannels">) => relation.userIdentifier != user._id,
    );

    // Gets the users associated to a channel
    let recievers = (
      await Promise.all(
        channels.map(async (reciever) => {
          const recevier = await ctx.db
            .query("users")
            .withIndex("by_id", (q) => q.eq("_id", reciever.userIdentifier))
            .collect();
          if (!recevier) throw new ConvexError("Bad reference at userChannels");
          return recevier;
        }),
      )
    ).flat();
    return recievers;
  },
});

export const getUsersByChannel = internalQuery({
  args: {
    channelIdentifier: v.id("channels"),
  },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);

    // Gets the channel and user relations by channel id
    let relationsOfChannel = await ctx.db
      .query("userChannels")
      .withIndex("by_channelIdentifier", (q) =>
        q.eq("channelIdentifier", args.channelIdentifier),
      )
      .collect();

    // Gets the users associated to a channel
    let recievers = (
      await Promise.all(
        relationsOfChannel.map(async (relation) => {
          const recievier = await ctx.db
            .query("users")
            .withIndex("by_id", (q) => q.eq("_id", relation.userIdentifier))
            .collect();
          if (!recievier) throw new ConvexError("Bad reference at userChannels");
          return recievier;
        }),
      )
    ).flat();
    return recievers;
  },
});
