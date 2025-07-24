/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as channels from "../channels.js";
import type * as clerkWebhook from "../clerkWebhook.js";
import type * as http from "../http.js";
import type * as messages from "../messages.js";
import type * as servers from "../servers.js";
import type * as threads from "../threads.js";
import type * as userChannels from "../userChannels.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  channels: typeof channels;
  clerkWebhook: typeof clerkWebhook;
  http: typeof http;
  messages: typeof messages;
  servers: typeof servers;
  threads: typeof threads;
  userChannels: typeof userChannels;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
