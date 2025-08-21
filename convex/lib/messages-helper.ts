/**
 * Retrieves the most recent message from a given thread.
 *
 * @param ctx - The Convex query context
 * @param thread - The thread document containing the channel identifier
 * @returns The last message document in the thread, or null if no messages exist
 */

import { internal } from "../_generated/api";
import type { Id } from "../_generated/dataModel";
import type { QueryCtx } from "../_generated/server";

export const getLastChannelMessage = async (
  ctx: QueryCtx,
  channelIdentifier: Id<"channels">,
) => {
  const lastMessage = await ctx.runQuery(internal.messages.getLastMessage, {
    channelIdentifier: channelIdentifier,
  });

  return lastMessage;
};
