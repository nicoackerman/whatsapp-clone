"use node";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { v } from "convex/values";
import { Webhook } from "svix";
import { internalAction } from "./_generated/server";

/* 
Internal action created in order to access the node enviorenment
This is due to a usage of the library svix
*/

/* 
Grabs the secret token to verify the webhook from your .env file.
*/
if (!process.env.CLERK_WEBHOOK_SECRET) {
  throw Error("no Clerk webhook key");
}
const WEB_HOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string;
export const fulfill = internalAction({
  args: {
    headers: v.any(),
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    /*
    Svix verifies the payload signature to ensure it's not forged    
    Verifica la firma del webhook (asegura que realmente vino de Clerk o quien sea que esté enviando el webhook).
    Lanza un error si la firma no es válida.
    Devuelve el cuerpo del webhook ya parseado como objeto si todo está bien.
    */
    const wh = new Webhook(WEB_HOOK_SECRET);
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent;
    /* 
    Returns a valid payload (action response) from clerk: { "id": "123", "event": "user.created" }
    */
    return payload;
  },
});
