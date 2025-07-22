import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";

export const createUser = internalMutation({
  args: {
    profileImg: v.string(),
    fullName: v.string(),
    tokenIdentifier: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      fullName: args.fullName,
      profileImg: args.profileImg,
      contacts: [],
      isOnline: true,
    });
  },
});

export const updateUser = internalMutation({
  args: { tokenIdentifier: v.string(), profileImg: v.string() },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);

    await ctx.db.patch(user._id, {
      profileImg: args.profileImg,
    });
  },
});

export const deleteUser = internalMutation({
  args: { tokenIdentifier: v.string() },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);

    await ctx.db.delete(user._id);
  },
});

export const setUserOnline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const { user } = await getAuthenticathedUser(ctx);

    // updated the online status
    await ctx.db.patch(user._id, { isOnline: true });
  },
});

export const setUserOffline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const { user } = await getAuthenticathedUser(ctx);

    /* updated the online status */
    await ctx.db.patch(user._id, { isOnline: false });
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const { identity } = await getAuthenticathedUser(ctx);

    /* Gets all registered users but itself */
    const allUsers = await ctx.db.query("users").collect();
    const users = allUsers.filter((user) => {
      return user.tokenIdentifier !== identity.tokenIdentifier;
    });
    return users;
  },
});

export const getMe = query({
  args: {},
  handler: async (ctx, args) => {
    const { user } = await getAuthenticathedUser(ctx);
    return user;
  },
});

export const addContact = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const { user } = await getAuthenticathedUser(ctx);

    const isAlreadyContact = user.contacts.includes(args.userId);
    if (isAlreadyContact) return;

    await ctx.db.patch(user._id, {
      contacts: [...user.contacts, args.userId],
    });
  },
});

export const deleteContact = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const { user } = await getAuthenticathedUser(ctx);

    const newContacts = user.contacts.filter((id) => id != args.userId);
    await ctx.db.patch(user._id, {
      contacts: newContacts,
    });
  },
});

export const getMyContacts = query({
  args: {},
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);
    return user.contacts;
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
