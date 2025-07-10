"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Video, X } from "lucide-react";
import { ChatPanelPlaceHolder } from "./ChatPanelPlaceholder";


export function RightChatPanel() {
  const selectedConversation = null;
  if (!selectedConversation) {
    return <ChatPanelPlaceHolder />;
  }
  const conversationName = "John Doe";
  return (
    <div className="flex grow flex-col justify-start">
      <div className="flex w-3/4 flex-col">
        <div className="sticky top-0 z-50 w-full">
          {/* Header */}
          <div className="bg-gray-primary flex justify-between p-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={"/placeholder.png"}
                  className="object-cover"
                />
                <AvatarFallback>
                  <div className="bg-gray-tertiary h-full w-full animate-pulse rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p>{conversationName}</p>
                {/* {isGroup && <GroupMembersDialog />} */}
              </div>
            </div>

            <div className="mr-5 flex items-center gap-7">
              <a href="/video-call" target="_blank">
                <Video size={23} />
              </a>
              <X size={16} className="cursor-pointer" />
            </div>
          </div>
        </div>
        {/* CHAT MESSAGES */}
        {/* <MessageContainer /> */}

        {/* INPUT */}
        {/* <MessageInput /> */}
      </div>
      );
    </div>
  );
}
