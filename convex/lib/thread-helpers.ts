import type { Doc } from "../_generated/dataModel";
import type { QueryCtx } from "../_generated/server";
import { internal } from "../_generated/api";
import { ConvexError } from "convex/values";
import { ChannelSummary } from "../types";

/**
 * Retrieves the peer user in a thread (the other member of the channel
 * different from the current user).
 *
 * @param ctx - The Convex query context
 * @param thread - The thread document containing the channel identifier
 * @returns The user document representing the peer member of the channel
 * @throws ConvexError if no peer user is found
 */
export const getPeer = async (ctx: QueryCtx, thread: Doc<"threads">) => {
	const recivers = await ctx.runQuery(
		internal.userChannels.getRecieversByChannel,
		{
			channelIdentifier: thread.channelIdentifier,
		},
	);
	if (!recivers || !recivers[0]) throw new ConvexError("Recivers not found");
	return recivers[0] as Doc<"users">;
};

/**
 * Retrieves the most recent message from a given thread.
 *
 * @param ctx - The Convex query context
 * @param thread - The thread document containing the channel identifier
 * @returns The last message document in the thread, or null if no messages exist
 */
export const getLastMessage = async (ctx: QueryCtx, thread: Doc<"threads">) => {
	const lastMessage = await ctx.runQuery(internal.messages.getLastMessage, {
		channelIdentifier: thread.channelIdentifier,
	});

	return lastMessage;
};

/**
 * Composes a summary for a list of threads, including the peer user and the last message for each.
 *
 * @param ctx - The Convex query context
 * @param threads - An array of thread documents
 * @returns An array of ChannelSummary objects
 */
export const getThreadsSummary = async (
	ctx: QueryCtx,
	threads: Doc<"threads">[],
) => {
	const previews: ChannelSummary[] = await Promise.all(
		threads.map(async (thread) => {
			const receiver = await getPeer(ctx, thread);
			const lastMessage = await getLastMessage(ctx, thread);
			return {
				channelIdentifier: thread.channelIdentifier,
				user: receiver,
				lastMessage: lastMessage,
			};
		}),
	);
	return previews;
};