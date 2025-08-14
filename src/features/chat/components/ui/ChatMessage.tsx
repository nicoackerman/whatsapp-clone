"use client";
import { cn, formatToHourMinute } from "~/lib/utils";
import type { MessageDoc } from "~/types";
import React, { createContext, useContext } from "react";
import { cva } from "class-variance-authority";

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
  return (
    <span className="text-soft-gray dark:text-soft-white text-xs">{date}</span>
  );
};

const OwnerBadge = () => {
  const { iamOwner, owner } = useMessage();
  const ownerName = iamOwner ? "You" : owner.firstName;

  const baseClass = "text-sm";
  const ownerColor = iamOwner
    ? "text-black dark:text-white"
    : "orange-400 dark:text-orange-400";
  return <span className={cn(baseClass, ownerColor)}>~{ownerName}</span>;
};

const Content = () => {
  const { content } = useMessage();
  return <p className="break-all whitespace-pre-wrap">{content}</p>;
};

const MessageRight = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full justify-end">
    <div className="bg-light-green dark:bg-dark-green mb-4 flex max-w-1/2 min-w-[120px] flex-col justify-end rounded-sm p-2">
      {children}
    </div>
  </div>
);

const MessageLeft = ({ children }: { children: React.ReactNode }) => (
  <div className="dark:bg-secondary-black mb-4 flex max-w-1/2 min-w-[120px] justify-start rounded-xs bg-gray-200">
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
