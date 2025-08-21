import { ConvexError, v } from "convex/values";
import { internalQuery, mutation, query, QueryCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { getAuthenticatedUser } from "./lib/auth-helpers";
import { getLastChannelMessage } from "./lib/messages-helper";
import { ChannelSummary } from "./types";

/*
**********
CORE
**********
*/

/**
 * Get all servers in which the current user's a reciever
 * @returns an array of channel objects
 */

export const get = internalQuery({
  async handler(ctx) {
    await getAuthenticatedUser(ctx);

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

/**
 * Create a new server object in db
 * @param name the name of the channel
 * @param imageUrl the profile img url for the server
 * @param recieverIdentifiers an array of user's id that will be reciever
 * of the channel's messages
 * @returns the id of the created server
 */

export const create = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
    recieverIdentifiers: v.array(v.id("users")),
  },
  async handler(ctx, args) {
    await getAuthenticatedUser(ctx);

    const channelIdentifier = (await ctx.runMutation(internal.channels.create, {
      type: "server",
      recieversIdentifier: args.recieverIdentifiers,
    })) as Id<"channels">;
    const serverIdentifier = await ctx.db.insert("servers", {
      channelIdentifier: channelIdentifier,
      name: args.name,
      imageUrl: args.imageUrl,
    });
    return serverIdentifier;
  },
});

/**
 * Retrieves a list of chat summaries for the authenticated user.
 *
 * @function getChatSummaries
 * @param ctx - Convex query context (handles authentication and DB access).
 * @returns A list of chat summaries (ChannelSummary[]) associated with the current user.
 *
 * @throws {ConvexError} If the user is not authenticated.
 */

export const getChatSummaries = query({
  async handler(ctx) {
    await getAuthenticatedUser(ctx);

    const servers = await ctx.runQuery(internal.servers.get);
    const summaries = await assembleChatSummaries(ctx, servers);
    return summaries;
  },
});

/*
**********
HELPERS
**********
*/

/**
 * Builds chat summaries from a list of servers.
 * @function assembleChatSummaries
 * @param ctx - Convex query context (used to fetch peer and last message).
 * @param threads - List of server documents to summarize.
 * @returns {Promise<ChannelSummary[]>} A list of objects of type ChannelSummary.
 *
 * @throws {ConvexError} If peer or last message lookups fail.
 */
const assembleChatSummaries = async (
  ctx: QueryCtx,
  servers: Doc<"servers">[],
) => {
  const previews: ChannelSummary[] = await Promise.all(
    servers.map(async (server) => {
      const { channelIdentifier, imageUrl, name } = server;
      const lastMessage = await getLastChannelMessage(ctx, channelIdentifier);

      return {
        channelIdentifier: channelIdentifier,
        profileImgUrl: imageUrl,
        channelName: name,
        lastMessage: lastMessage,
      };
    }),
  );
  return previews;
};
