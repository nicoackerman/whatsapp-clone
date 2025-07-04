import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import {
  MessageSquareIcon,
  PersonStandingIcon,
  MoreVertical,
  MessagesSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <aside className="flex size-full flex-row">
            {/* App sections */}
            <div className="flex h-full w-1/4 flex-col items-center justify-between px-2 py-4 dark:bg-[#1D1F1F]">
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
                <Button className="bg-transparent hover:bg-gray-200/10 dark:text-white rounded-full">
                  <MoreVertical className="size-5" />
                </Button>
              </div>
              {/* Chat options */}
              <div className="flex grow flex-col justify-start">
                <Button className="flex items-center justify-between gap-3 bg-transparent p-4 hover:bg-gray-200/10 dark:text-white">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>Felipe</h3>
                    <p className="line-clamp-1">I just asked bla bla</p>
                  </div>
                </Button>
              </div>
            </div>
          </aside>
        </SidebarContent>
      </Sidebar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
