import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { getAuthenticatedUser } from "./lib/auth_helpers";
import type { SafeUser } from "./types";
import { internal } from "./_generated/api";

/*
**********
HELPERS
**********
*/

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
    const { user } = await getAuthenticatedUser(ctx);
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
    const { user } = await getAuthenticatedUser(ctx);

    let channels = await ctx.db
      .query("userChannels")
      .withIndex("by_userIdentifier", (q) => q.eq("userIdentifier", user._id))
      .collect();
    return channels;
  },
});

/**
 * Retrieves the receivers of a channel (the users associated with the channel,
 * excluding the authenticated user making the request).
 *
 * @function getRecieversByChannel
 * @param ctx - Convex query context (handles auth and DB)
 * @param args - Query arguments
 * @param args.channelIdentifier - Unique identifier of the channel
 *
 * @throws {ConvexError} If an authentication error or invalid reference occurs
 *
 */

export const getRecieversByChannel = internalQuery({
  args: {
    channelIdentifier: v.id("channels"),
  },
  async handler(ctx, args) {
    const { user } = await getAuthenticatedUser(ctx);

    // Step 1: fetch user-channel relations by channel id
    const relationsFromChannel = await getRelationsByChannel(
      ctx,
      args.channelIdentifier,
    );

    // Step 2: filter relations, excluding the current user
    const recieverRelations = filterOutCurrentUser(
      relationsFromChannel,
      user._id,
    );

    // Step 3: retrieve the users associated with those relations
    const recievers = await getUsersFromRelations(ctx, recieverRelations);

    return recievers;
  },
});

export const getUsersByChannel = internalQuery({
  args: {
    channelIdentifier: v.id("channels"),
  },
  async handler(ctx, args) {
    const { user } = await getAuthenticatedUser(ctx);

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
          if (!recievier)
            throw new ConvexError("Bad reference at userChannels");
          return recievier;
        }),
      )
    ).flat();
    return recievers;
  },
});

/*
**********
HELPERS
**********
*/

/**
 * Retrieves the `userChannel` relations associated with a specific channel.
 *
 * @param ctx - Convex query context
 * @param channelId - Unique identifier of the channel
 * @returns List of user-channel relations
 */
async function getRelationsByChannel(ctx: QueryCtx, channelId: Id<"channels">) {
  return ctx.db
    .query("userChannels")
    .withIndex("by_channelIdentifier", (q) =>
      q.eq("channelIdentifier", channelId),
    )
    .collect();
}

/**
 * Filters out relations belonging to the current user.
 *
 * @param relations - List of user-channel relations
 * @param currentUserId - Identifier of the authenticated user
 * @returns Relations excluding the current user
 */
function filterOutCurrentUser(
  relations: Doc<"userChannels">[],
  currentUserId: Id<"users">,
) {
  return relations.filter(
    (relation: Doc<"userChannels">) =>
      relation.userIdentifier !== currentUserId,
  );
}

/**
 * Retrieves users from user-channel relations.
 *
 * @param ctx - Convex query context
 * @param relations - Filtered relations (excluding the current user)
 * @returns List of users associated with the given relations
 * @throws ConvexError if a relation references a non-existent user
 */
async function getUsersFromRelations(
  ctx: QueryCtx,
  relations: Doc<"userChannels">[],
) {
  const users = await Promise.all(
    relations.map(async (relation: Doc<"userChannels">) => {
      const user: SafeUser = await ctx.runQuery(
        internal.users.getPublicProfile,
        { userIdentifier: relation.userIdentifier },
      );

      if (!user) throw new ConvexError("Bad reference at userChannels");
      return user;
    }),
  );

  // Flatten results because each query returns an array
  return users.flat();
}
