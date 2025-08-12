import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  query,
  type QueryCtx,
} from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import type { PublicProfile } from "./users";

export type Messages = Omit<
  Doc<"messages">,
  "senderIdentifier" | "channelIdentifier"
> & {
  iamOwner: boolean;
  owner: PublicProfile;
};

export const create = internalMutation({
  args: {
    type: v.union(v.literal("thread"), v.literal("server")),
    recieversIdentifier: v.array(v.id("users")),
  },
  async handler(ctx, args) {
    await getAuthenticathedUser(ctx);
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

export const get = internalQuery({
  async handler(ctx) {
    await getAuthenticathedUser(ctx);

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

export const getRecivers = query({
  args: { channelIdentifier: v.id("channels") },
  async handler(ctx, args) {
    await getAuthenticathedUser(ctx);

    const users: Doc<"users">[] = await ctx.runQuery(
      internal.userChannels.getUsersByChannel,
      { channelIdentifier: args.channelIdentifier },
    );

    return users;
  },
});

export const getMessages = query({
  args: { channelIdentifier: v.id("channels") },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);

    // gets all the object messages in the db
    const _messages: Doc<"messages">[] = await ctx.runQuery(
      internal.messages.getByChannel,
      { channelIdentifier: args.channelIdentifier },
    );

    // transoform the messages from db to show all
    // the data from messages in a single query
    const messages = Promise.all(
      _messages.map(async (_message) => {
        const owner: PublicProfile = await ctx.runQuery(
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
