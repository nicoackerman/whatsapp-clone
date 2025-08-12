"use client";

import type { MessageDoc } from "~/types";

/**
 * [] Obtain necessary data for displaying the messages
 *  - [] Obtain all messages for the current channel
 *  - [] Obtain channel members profile image and name
 * [] Render each message
 *  - [] If message is owned by the curent user display message right align
 *  - [] If message isn't owned by the curent user display message left align
 */

/**
 * Message from the api:
 * {
 *  content: "Hello",
 *  senderIdentifier: "Hello",
 *  channelIdentifier: "Hello",
 * }
 */

/**
 * Message piped:
 * {
 *  content: "Hello",
 *  sender: {
 *    profileImg
 *    firstName
 *    lastName
 *  },
 *  iamOwner: true,
 *  channelIdentifier: "Hello",
 * }
 */

/**
 * Only for UI components
 */

export function Timestamp({ timestamp }: { timestamp: number }) {
  const date = new Date(timestamp).toLocaleString();
  return <span>{date}</span>;
}

export function OwnerBadge({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <span>{children}</span>;
}

export function MessageRight({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mb-4 flex justify-end">{children}</div>;
}

export function MessageLeft({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mb-4 flex justify-start">{children}</div>;
}

/**
 * Logic components
 */

export function Message({ message }: { message: MessageDoc }) {
  const { iamOwner, content, _creationTime } = message;

  const messageBubble = (
    <div className="flex max-w-xs flex-col lg:max-w-md">
      <div
        className={`rounded-lg p-3 ${iamOwner ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
      >
        <OwnerBadge>{"HOla"}</OwnerBadge>
        <p className="text-sm">{content}</p>
        <div className="mt-1 text-xs text-gray-400">
          <Timestamp timestamp={_creationTime} />
        </div>
      </div>
    </div>
  );

  if (iamOwner) {
    return <MessageRight>{messageBubble}</MessageRight>;
  }

  return <MessageLeft>{messageBubble}</MessageLeft>;
}

export function ChatContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}

export function MessageList({ messages }: { messages: MessageDoc[] }) {
  return (
    <div>
      {messages.map((message: MessageDoc) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}
