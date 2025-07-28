import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  MutationCtx,
  QueryCtx,
} from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

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

export const getUsersOfChannel = internalQuery({
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
    // Gets the channel and user relations that do not contain the current users (recievers)
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
