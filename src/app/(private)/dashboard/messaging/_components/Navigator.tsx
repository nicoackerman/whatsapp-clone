import React from "react"
import { ChatAction } from "./ChatAction";
import { Sidebar, SidebarContent } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import { MessagesSquare, MoreVertical, Users, type LucideIcon } from "lucide-react";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export function Navigator() {
  return (
    <Sidebar>
      <SidebarContent>
        <aside className="flex size-full flex-row">
          {/* App sections */}
          <div className="flex h-full w-1/7 flex-col items-center justify-between px-2 py-4 dark:bg-[#1D1F1F]">
            <div className="flex flex-col items-center gap-3">
              <Button className="size-9 rounded-full bg-transparent hover:bg-gray-200/10 dark:text-white">
                <MessagesSquare className="size-4" />
              </Button>
              <Button className="bg-dark:text-white size-9 rounded-full bg-transparent hover:bg-gray-200/10 dark:text-white">
                <Users className="size-4" />
              </Button>
              <Button className="size-9 rounded-full bg-transparent hover:bg-gray-200/10 dark:text-white">
                <ModeToggle />
              </Button>
            </div>
            <div>
              <UserButton />
            </div>
          </div>
          {/* Chat list */}
          <div className="flex h-full flex-grow flex-col px-2 py-4 dark:bg-[#121313]">
            {/* Chat Header */}
            <div className="flex justify-between">
              <h1>WhatsApp</h1>
              <Button className="rounded-full bg-transparent hover:bg-gray-200/10 dark:text-white">
                <MoreVertical className="size-5" />
              </Button>
            </div>
            {/* Chat options */}
            <div className="flex grow flex-col justify-start">
              <ChatAction/>
            </div>
          </div>
        </aside>
      </SidebarContent>
    </Sidebar>
  );
}