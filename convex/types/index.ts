import { Doc, Id } from "../_generated/dataModel";

export interface ChannelSummary {
  channelIdentifier: Id<"channels">;
  profileImgUrl: string;
  channelName: string;
  lastMessage: Doc<"messages"> | null;
}

export type EnrichedMessage = Omit<
  Doc<"messages">,
  "senderIdentifier" | "channelIdentifier"
> & {
  iamOwner: boolean;
  owner: SafeUser;
};

export type SafeUser = Omit<Doc<"users">, "_creationTime" | "tokenIdentifier">;
