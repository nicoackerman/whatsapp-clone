import { Avatar } from "~/components/ui/avatar";
import { Paperclip, Mic, Smile, Send } from "lucide-react";
import { useChatStore } from "../hooks/useChatStore";

export function ChatThread() {
  
  return (
    <div className="flex h-full flex-col bg-gray-100 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-zinc-600" />
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-zinc-400">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <Paperclip className="h-5 w-5 cursor-pointer" />
          <Mic className="h-5 w-5 cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div className="bg-chat-pattern flex-1 space-y-4 overflow-y-auto bg-repeat p-4 dark:bg-zinc-900">
        <div className="max-w-[70%] self-start rounded-lg bg-zinc-700 p-3 text-white">
          Hi there! How are you?
        </div>
        <div className="ml-auto max-w-[70%] self-end rounded-lg bg-green-600 p-3 text-white">
          I’m doing well, thanks! You?
        </div>
        <div className="max-w-[70%] self-start rounded-lg bg-zinc-700 p-3 text-white">
          Pretty good, just working on the project.
        </div>
      </div>

      {/* Message Input */}
      <div className="flex items-center gap-3 border-t border-zinc-700 bg-zinc-800 p-4">
        <Smile className="h-5 w-5 cursor-pointer text-zinc-400" />
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 rounded-full bg-zinc-700 px-4 py-2 text-white placeholder-zinc-400 outline-none"
        />
        <Send className="h-5 w-5 cursor-pointer text-zinc-400" />
      </div>
    </div>
  );
}
