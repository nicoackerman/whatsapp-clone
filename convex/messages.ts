import { v } from "convex/values";
import { internalQuery, mutation, type QueryCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { getAuthenticatedUser } from "./lib/auth_helpers";

/**
 * Retrieves the last message for a given channel.
 * @param ctx - The query context.
 * @param channelIdentifier - The ID of the channel.
 * @returns The last message document, or undefined if no messages are found.
 */
const getLastMessageOfChannel = async (
  ctx: QueryCtx,
  channelIdentifier: Id<"channels">,
) => {
  const lastMessage = await ctx.db
    .query("messages")
    .withIndex("by_channelIdentifier", (q) =>
      q.eq("channelIdentifier", channelIdentifier),
    )
    .order("desc")
    .take(1);
  return lastMessage[0];
};

/**
 * Creates a new message in a channel.
 * @param content - The content of the message.
 * @param channelIdentifier - The ID of the channel to post the message in.
 * @returns A promise that resolves when the message is created.
 */
export const create = mutation({
  args: {
    content: v.string(),
    channelIdentifier: v.id("channels"),
  },
  async handler(ctx, args) {
    const { user } = await getAuthenticatedUser(ctx);

    await ctx.db.insert("messages", {
      content: args.content,
      senderIdentifier: user._id,
      channelIdentifier: args.channelIdentifier,
    });
  },
});

/**
 * Retrieves all messages for a given channel. (Internal use)
 * @param channelIdentifier - The ID of the channel.
 * @returns An array of message documents.
 */
export const getByChannel = internalQuery({
  args: { channelIdentifier: v.id("channels") },
  async handler(ctx, args) {
    const channelMessages = await ctx.db
      .query("messages")
      .withIndex("by_channelIdentifier", (q) =>
        q.eq("channelIdentifier", args.channelIdentifier),
      )
      .collect();
    return channelMessages;
  },
});

/**
 * Retrieves the last message of a channel. (Internal use)
 * Ensures the user is authenticated before fetching.
 * @param channelIdentifier - The ID of the channel.
 * @returns The last message document, or undefined if no messages are found.
 */
export const getLastMessage = internalQuery({
  args: { channelIdentifier: v.id("channels") },
  async handler(ctx, args) {
    await getAuthenticatedUser(ctx);

    const lastMessage = await getLastMessageOfChannel(
      ctx,
      args.channelIdentifier,
    );
    return lastMessage;
  },
});

/**
 * Creates a new message in which the current user is the reciever.
 * @param content - The content of the message.
 * @param channelIdentifier - The ID of the channel to post the message in.
 * @param senderIdentifier - The ID of the user that will be sending the message
 * @returns A promise that resolves when the message is created.
 */
export const createCrossMessage = mutation({
  args: {
    content: v.string(),
    channelIdentifier: v.id("channels"),
    senderIdentifier: v.id("users"),
  },
  async handler(ctx, args) {
    await ctx.db.insert("messages", {
      content: args.content,
      senderIdentifier: args.senderIdentifier,
      channelIdentifier: args.channelIdentifier,
    });
  },
});
