import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

/* CRUD */
export const create = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    profileImg: v.string(),
    firstName: v.string(),
    lastName: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      firstName: args.firstName,
      lastName: args.lastName,
      profileImg: args.profileImg,
    });
  },
});

export const update = internalMutation({
  args: { tokenIdentifier: v.string(), profileImg: v.string() },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);

    await ctx.db.patch(user._id, {
      profileImg: args.profileImg,
    });
  },
});

export const eliminate = internalMutation({
  args: { tokenIdentifier: v.string() },
  async handler(ctx, args) {
    const { user } = await getAuthenticathedUser(ctx);

    await ctx.db.delete(user._id);
  },
});
 

/* functionalities */
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