import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

/*
  This creates an http action (a public function accesible by an http request) 
  Every time clerk handles a new user it access our convex storage through this end-point
  and updates de user information storaged in our database
*/
http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const payloadString = await req.text();
    const headerPayload = req.headers;

    try {
      /* Access and verifies the clerk response */
      const result = await ctx.runAction(internal.clerkWebhook.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-signature": headerPayload.get("svix-signature")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
        },
      });

      /* 
        Updated the user storage in convex based on the action type 
        handled by Clerk
      */
      switch (result.type) {
        case "user.created":
          await ctx.runMutation(internal.users.create, {
            tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${result.data.id}`,
            firstName: result.data.first_name,
            lastName: result.data.last_name,
            profileImg: result.data.image_url,
          });
          break;
        case "user.updated":
          await ctx.runMutation(internal.users.update, {
            tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${result.data.id}`,
            profileImg: result.data.image_url,
          });
          break;
        case "user.deleted":
          await ctx.runMutation(internal.users.eliminate, {
            tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${result.data.id}`,
          });
          break;
      }

      /* Return a successful connection response */
      return new Response(null, {
        status: 200,
      });
    } catch (error) {
      console.log("Webhook Error", error);
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;
