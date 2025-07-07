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
import { MessagesSquare, Users, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { JSX } from "react";
import {
  SidebarSectionItem,
  type SectionOption,
} from "~/features/sidebar/SectionItem";

const APP_SECTIONS: SectionOption[] = [
  {
    icon: MessagesSquare,
    tooltip: "Messages",
    identifier: "messages",
    type: "link",
  },
  {
    icon: Users,
    tooltip: "Contacts",
    identifier: "contacts",
    type: "link",
  },
  {
    icon: <ModeToggle />,
    tooltip: "Toogle Theme Mode",
    identifier: "tooglemode",
    type: "action",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "3.5rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <Sidebar>
        <SidebarContent>
          <SidebarMenu className="flex flex-col items-center space-y-3 py-4">
            {APP_SECTIONS.map((section) => {
              return (
                <SidebarSectionItem
                  key={section.identifier}
                  section={section}
                />
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu className="flex flex-col items-center">
            <SidebarMenuItem>
              <UserButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
