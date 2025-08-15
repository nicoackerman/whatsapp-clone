import { ConvexError, v } from "convex/values";
import {
  internalQuery,
  mutation,
  query,
  type QueryCtx,
} from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export interface Preview {
  channelIdentifier: Id<"channels">;
  user: Doc<"users">;
  lastMessage: Doc<"messages"> | null;
}
const getAuthenticatedUser = async (ctx: QueryCtx) => {
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

const getReciver = async (ctx: QueryCtx, thread: Doc<"threads">) => {
  const recivers = await ctx.runQuery(
    internal.userChannels.getRecieversByChannel,
    {
      channelIdentifier: thread.channelIdentifier,
    },
  );
  if (!recivers || !recivers[0]) throw new ConvexError("Recivers not found");
  return recivers[0] as Doc<"users">;
};

const getLastMessage = async (ctx: QueryCtx, thread: Doc<"threads">) => {
  const lastMessage = await ctx.runQuery(internal.messages.getLastMessage, {
    channelIdentifier: thread.channelIdentifier,
  });

  return lastMessage;
};
const getThreadsSummary = async (ctx: QueryCtx, threads: Doc<"threads">[]) => {
  const previews: Preview[] = await Promise.all(
    threads.map(async (thread) => {
      const receiver = await getReciver(ctx, thread);
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

export const get = internalQuery({
  async handler(ctx) {
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

export const getSummary = query({
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    console.log(identity.tokenIdentifier);
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const threads = await ctx.runQuery(internal.threads.get);
    const summary = await getThreadsSummary(ctx, threads);
    return summary;
  },
});
