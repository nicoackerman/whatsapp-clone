import { ConvexError, v } from "convex/values";
import {
  internalQuery,
  mutation,
  query,
  type QueryCtx,
} from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { getAuthenticatedUser } from "./lib/auth-helpers";
import { ChannelSummary, SafeUser } from "./types";
import { getLastChannelMessage } from "./lib/messages-helper";

/*
**********
HELPERS
**********
*/

/**
 * Retrieves the peer user in a thread (the other member of the channel
 * different from the current user).
 *
 * @param ctx - The Convex query context
 * @param thread - The thread document containing the channel identifier
 * @returns The user document representing the peer member of the channel
 * @throws ConvexError if no peer user is found
 */

const getPeer = async (ctx: QueryCtx, channelIdentifier: Id<"channels">) => {
  const recivers = await ctx.runQuery(
    internal.userChannels.getRecieversByChannel,
    {
      channelIdentifier: channelIdentifier,
    },
  );
  if (!recivers || !recivers[0]) throw new ConvexError("Recivers not found");
  return recivers[0] as SafeUser;
};

/**
 * Builds chat summaries from a list of threads.
 *
 * Each summary includes:
 * - The channel identifier
 * - The peer's profile image
 * - The peer's first name
 * - The last message sent in the channel
 *
 * @function assembleChatSummaries
 * @param ctx - Convex query context (used to fetch peer and last message).
 * @param threads - List of thread documents to summarize.
 * @returns {Promise<ChannelSummary[]>} A list of chat summaries.
 *
 * @throws {ConvexError} If peer or last message lookups fail.
 */
const assembleChatSummaries = async (
  ctx: QueryCtx,
  threads: Doc<"threads">[],
) => {
  const previews: ChannelSummary[] = await Promise.all(
    threads.map(async (thread) => {
      const { channelIdentifier } = thread;
      const receiver = await getPeer(ctx, channelIdentifier);
      const lastMessage = await getLastChannelMessage(ctx, channelIdentifier);

      return {
        channelIdentifier: channelIdentifier,
        profileImgUrl: receiver.profileImg,
        channelName: receiver.firstName,
        lastMessage: lastMessage,
      };
    }),
  );
  return previews;
};

/*
**********
CORE ENPOINTS
**********
*/

/**
 * Creates a new thread between the authenticated user and a receiver.
 *
 * This mutation ensures that the user is authenticated, creates a new channel
 * of type "thread" with the given receiver, and then inserts a corresponding
 * thread document linked to that channel.
 *
 * @param receiverIdentifier - The unique identifier of the user to start a thread with
 * @returns The identifier of the newly created thread document
 * @throws ConvexError if the user is not authenticated
 */

export const create = mutation({
  args: { receiverIdentifier: v.id("users") },
  async handler(ctx, args) {
    await getAuthenticatedUser(ctx);

    const channelIdentifier = (await ctx.runMutation(internal.channels.create, {
      type: "thread",
      recieversIdentifier: [args.receiverIdentifier],
    })) as Id<"channels">;
    const threadIdentifier = await ctx.db.insert("threads", {
      channelIdentifier: channelIdentifier,
    });
    return threadIdentifier;
  },
});

/**
 * Retrieves all threads associated with the currently authenticated user.
 * This is an internal query and should not be exposed directly to the client.
 *
 * @returns an array of thread documents.
 * @throws ConvexError if the user is not authenticated or if a thread reference is broken.
 */
export const get = internalQuery({
  async handler(ctx) {
    await getAuthenticatedUser(ctx);

    const allChannels: Doc<"channels">[] = await ctx.runQuery(
      internal.channels.get,
    );
    const threadChannels = allChannels.filter(
      (channel) => channel.type == "thread",
    );

    const threads = await Promise.all(
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

/**
 * Retrieves a list of chat summaries for the authenticated user.
 *
 * @function getChatSummaries
 * @param ctx - Convex query context (handles authentication and DB access).
 * @returns A list of chat summaries (ChannelSummary[]) associated with the current user.
 *
 * @throws {ConvexError} If the user is not authenticated.
 */

export const getChatSummaries = internalQuery({
  async handler(ctx) {
    await getAuthenticatedUser(ctx);

    const threads = await ctx.runQuery(internal.threads.get);
    const summaries = await assembleChatSummaries(ctx, threads);
    return summaries;
  },
});
