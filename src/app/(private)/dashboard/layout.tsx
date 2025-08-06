"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { SidebarSectionItem } from "~/features/sidebar/SectionItem";
import {
  APP_SECTIONS,
  type SectionIdentifier,
} from "~/features/sidebar/config";

function SidbarItemsList() {
  return Object.entries(APP_SECTIONS).map(([identifier, section]) => (
    <SidebarSectionItem
      key={identifier}
      section={section}
      identifier={identifier as SectionIdentifier}
    />
  ));
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider
      currentPanelId={"messages"}
      style={
        {
          "--sidebar-width": "3.5rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <Sidebar>
        <SidebarContent className="bg-[##F7F5F3] dark:bg-[#1e2020]">
          <SidebarMenu className="flex flex-col items-center space-y-3 py-4">
            <SidbarItemsList />
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
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
