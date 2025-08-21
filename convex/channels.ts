import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  query,
  type QueryCtx,
} from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { getAuthenticatedUser } from "./lib/auth-helpers";
import { ChannelSummary, SafeUser } from "./types";

/*
**********
CORE
**********
*/

/**
 * Creates a new channel object in db
 * @param type is the type of channel: either server or thread
 * @param  recieversIdentifier an array of all channel members ids
 * @returns an id for the created channel
 */

export const create = internalMutation({
  args: {
    type: v.union(v.literal("thread"), v.literal("server")),
    recieversIdentifier: v.array(v.id("users")),
  },
  async handler(ctx, args) {
    await getAuthenticatedUser(ctx);
    const channelIdentifier = await ctx.db.insert("channels", {
      type: args.type,
    });
    const relationIdentifiers = await ctx.runMutation(
      internal.userChannels.create,
      {
        channelIdentifier: channelIdentifier,
        recieversIdentifier: args.recieversIdentifier,
      },
    );
    return channelIdentifier;
  },
});

/**
 * gets all the channels in which the current user is a member
 * @returns an array of channels
 */

export const get = internalQuery({
  async handler(ctx) {
    await getAuthenticatedUser(ctx);

    // gets all current user's references (userChannels object)
    const channelRefs: Doc<"userChannels">[] = await ctx.runQuery(
      internal.userChannels.get,
    );
    // gets all current users' channels (channels object)
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

/**
 * Gets the channel summaries of the current user
 * @returns an array of objects of type ChannelSummary
 */

export const getChannelSummaries = query({
  async handler(ctx) {
    const threadSummaries = await ctx.runQuery(
      internal.threads.getChatSummaries,
    );
    const serverSummaries = await ctx.runQuery(
      internal.servers.getChatSummaries,
    );

    const summaries: ChannelSummary[] = threadSummaries.concat(serverSummaries);
    return summaries;
  },
});

/**
 * Get all members of a channel
 * @param channelIdentifier is a channel id
 * @returns an array of users that are recievers of a channel
 */

export const getRecivers = query({
  args: { channelIdentifier: v.id("channels") },
  async handler(ctx, args) {
    await getAuthenticatedUser(ctx);

    const users: Doc<"users">[] = await ctx.runQuery(
      internal.userChannels.getUsersByChannel,
      { channelIdentifier: args.channelIdentifier },
    );

    return users;
  },
});

/**
 * Get the enriched messages of a given channel (useful for ui purpuses)
 * @param channelIdentifier is a channel id
 * @returns an array of messages of type EnrichedMessages
 */

export const getMessages = query({
  args: { channelIdentifier: v.id("channels") },
  async handler(ctx, args) {
    const { user } = await getAuthenticatedUser(ctx);

    // gets all the object messages in the db
    const _messages: Doc<"messages">[] = await ctx.runQuery(
      internal.messages.getByChannel,
      { channelIdentifier: args.channelIdentifier },
    );

    // transoform the messages from db to show all
    // the data from messages in a single query
    const messages = Promise.all(
      _messages.map(async (_message) => {
        const owner: SafeUser = await ctx.runQuery(
          internal.users.getPublicProfile,
          {
            userIdentifier: _message.senderIdentifier,
          },
        );

        const { content, _creationTime, _id } = _message;
        const iamOwner = user._id == _message.senderIdentifier;

        return { content, _creationTime, _id, owner, iamOwner };
      }),
    );

    return messages;
  },
});
/*
**********
HELPERS
**********
*/

/**
 * Retrieves all channels associated with the authenticated user.
 *
 * Executes an internal query to fetch the user's channels from the database.
 *
 * @param ctx - The Convex query context
 * @returns A list of channel documents associated with the user
 * @throws ConvexError if the user's channels cannot be retrieved
 */

const getUserChannels = async (ctx: QueryCtx) => {
  const channels = await ctx.runQuery(internal.channels.get);

  if (!channels)
    throw new ConvexError("It was not possible to access user's channels");

  return channels;
};
