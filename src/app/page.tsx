"use client";

import type React from "react";

import { useState } from "react";
import {
  Search,
  MoreVertical,
  Smile,
  Send,
  RotateCcw,
  Trash2,
  UserPlus,
  Edit3,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
}

const chats: Chat[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey! How are you doing?",
    time: "10:30",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the help yesterday!",
    time: "09:45",
    online: false,
  },
  {
    id: 3,
    name: "Family Group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Mom: Don't forget dinner tonight",
    time: "08:20",
    unread: 5,
    online: false,
  },
  {
    id: 4,
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "See you at the meeting!",
    time: "Yesterday",
    online: true,
  },
  {
    id: 5,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The project looks great 👍",
    time: "Yesterday",
    online: false,
  },
];

const messages: Message[] = [
  { id: 1, text: "Hey! How are you doing?", time: "10:25", sent: false },
  {
    id: 2,
    text: "I'm doing great! Just finished a big project at work",
    time: "10:26",
    sent: true,
  },
  {
    id: 3,
    text: "That's awesome! What kind of project was it?",
    time: "10:27",
    sent: false,
  },
  {
    id: 4,
    text: "It was a new mobile app for our company. Took about 3 months to complete",
    time: "10:28",
    sent: true,
  },
  {
    id: 5,
    text: "Wow, that sounds like a lot of work! I'd love to see it sometime",
    time: "10:29",
    sent: false,
  },
  {
    id: 6,
    text: "I'll show you when we meet up next week",
    time: "10:30",
    sent: true,
  },
];

export default function WhatsAppClone() {
  const [selectedChat, setSelectedChat] = useState<Chat>({
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey! How are you doing?",
    time: "10:30",
    unread: 2,
    online: true,
  });
  const [newMessage, setNewMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleMessageClick = (messageId: number) => {
    setSelectedMessage(selectedMessage === messageId ? null : messageId);
  };

  const handleDeleteChat = () => {
    console.log("Deleting chat:", selectedChat.name);
    // In a real app, this would delete the chat
  };

  const handleAddContact = () => {
    console.log("Adding contact:", selectedChat.name);
    // In a real app, this would add the contact
  };

  const handleRenameContact = () => {
    console.log("Renaming contact:", selectedChat.name);
    // In a real app, this would open a rename dialog
  };

  const handleDeleteContact = () => {
    console.log("Deleting contact:", selectedChat.name);
    // In a real app, this would delete the contact
  };

  const handleResendMessage = (messageId: number) => {
    console.log("Resending message:", messageId);
    // In a real app, this would resend the message
  };

  const handleDeleteMessageForAll = (messageId: number) => {
    console.log("Deleting message for all:", messageId);
    // In a real app, this would delete the message for everyone
  };

  const handleDeleteMessageForMe = (messageId: number) => {
    console.log("Deleting message for me:", messageId);
    // In a real app, this would delete the message for current user only
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex w-1/3 flex-col border-r border-gray-200 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">WhatsApp</h1>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search or start new chat"
              className="bg-white pl-10"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex cursor-pointer items-center border-b border-gray-100 p-4 hover:bg-gray-50 ${
                selectedChat.id === chat.id ? "bg-gray-50" : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={chat.avatar || "/placeholder.svg"}
                    alt={chat.name}
                  />
                  <AvatarFallback>
                    {chat.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                )}
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm text-gray-600">
                    {chat.lastMessage}
                  </p>
                  {chat.unread && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={selectedChat.avatar || "/placeholder.svg"}
                alt={selectedChat.name}
              />
              <AvatarFallback>
                {selectedChat.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h2 className="text-sm font-medium text-gray-900">
                {selectedChat.name}
              </h2>
              <p className="text-xs text-gray-500">
                {selectedChat.online ? "online" : "last seen recently"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleAddContact}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Contact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRenameContact}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Rename Contact
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDeleteContact}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Contact
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteChat}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 bg-gray-50 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
              >
                <div className="relative">
                  <div
                    className={`max-w-xs cursor-pointer rounded-lg px-4 py-2 lg:max-w-md ${
                      message.sent
                        ? "bg-green-500 text-white"
                        : "border border-gray-200 bg-white text-gray-800"
                    } ${selectedMessage === message.id ? "ring-2 ring-blue-500" : ""}`}
                    onClick={() => handleMessageClick(message.id)}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`mt-1 text-xs ${message.sent ? "text-green-100" : "text-gray-500"}`}
                    >
                      {message.time}
                    </p>
                  </div>

                  {selectedMessage === message.id && (
                    <div
                      className={`absolute top-0 ${message.sent ? "right-full mr-2" : "left-full ml-2"} z-10 rounded-lg border border-gray-200 bg-white p-2 shadow-lg`}
                    >
                      <div className="flex flex-col space-y-1">
                        {message.sent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start text-xs"
                            onClick={() => handleResendMessage(message.id)}
                          >
                            <RotateCcw className="mr-2 h-3 w-3" />
                            Resend
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start text-xs text-red-600"
                          onClick={() => handleDeleteMessageForAll(message.id)}
                        >
                          <Trash2 className="mr-2 h-3 w-3" />
                          Delete for All
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start text-xs text-red-600"
                          onClick={() => handleDeleteMessageForMe(message.id)}
                        >
                          <Trash2 className="mr-2 h-3 w-3" />
                          Delete for Me
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center space-x-2"
          >
            <Button variant="ghost" size="icon" type="button">
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-green-500 hover:bg-green-600"
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
