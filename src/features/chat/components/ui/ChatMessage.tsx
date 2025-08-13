"use client";
import { formatToHourMinute } from "~/lib/utils";
import type { MessageDoc } from "~/types";
import React, { createContext, useContext } from "react";

// Context to hold message data
const MessageContext = createContext<MessageDoc | null>(null);

// Hook to access message data
const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error(
      "useMessage must be used within a ChatMessage.Root component",
    );
  }
  return context;
};

// Compound Component parts
const Timestamp = () => {
  const { _creationTime } = useMessage();
  const date = formatToHourMinute(_creationTime);
  return <span className="text-sm">{date}</span>;
};

const OwnerBadge = () => {
  const { iamOwner, owner } = useMessage();
  const ownerName = iamOwner ? "You" : owner.firstName;
  return <span className="text-gray-700 dark:text-[#B5FFD9]">~{ownerName}</span>;
};

const Content = () => {
  const { content } = useMessage();
  return <p className="break-all whitespace-pre-wrap">{content}</p>;
};

const MessageRight = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full justify-end">
    <div className="bg-green-200 dark:bg-dark-green mb-4 flex max-w-1/2 flex-col justify-end rounded-sm p-2">
      {children}
    </div>
  </div>
);

const MessageLeft = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-200 dark:bg-secondary-black mb-4 flex max-w-1/2 justify-start rounded-xs">
    {children}
  </div>
);

const ContentTop = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between">{children}</div>
);

const ContentBottom = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const Root = ({
  message,
  children,
}: {
  message: MessageDoc;
  children: React.ReactNode;
}) => {
  const Container = message.iamOwner ? MessageRight : MessageLeft;
  return (
    <MessageContext.Provider value={message}>
      <Container>{children}</Container>
    </MessageContext.Provider>
  );
};

const ChatMessage = ({ message }: { message: MessageDoc }) => {
  const { iamOwner } = message;

  if (iamOwner) {
    return (
      <Root message={message}>
        <ContentTop>
          <OwnerBadge />
          <Timestamp />
        </ContentTop>
        <ContentBottom>
          <Content />
        </ContentBottom>
      </Root>
    );
  }

  return (
    <Root message={message}>
      <ContentTop>
        <OwnerBadge />
        <Timestamp />
      </ContentTop>
      <ContentBottom>
        <Content />
      </ContentBottom>
    </Root>
  );
};

export default ChatMessage;
