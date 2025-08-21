import { ConvexError } from "convex/values";
import { type QueryCtx } from "../_generated/server";

/**
 * Checks for authentication using getUserIdenitity and
 * getting the user from the db
 * @returns an object with user and identify objects
 */
export const getAuthenticatedUser = async (ctx: QueryCtx) => {
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
