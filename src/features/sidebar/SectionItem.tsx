"use client";
import type { LucideIcon } from "lucide-react";
import { useRef, type JSX } from "react";
import { Button } from "~/components/ui/button";
import type { PanelIdentifier } from "~/features/panels/config";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type SectionIdentifier, type SectionOptionObj } from "./config";
function SidebarSectionItem({
  identifier,
  section,
  ...props
}: React.ComponentProps<"li"> & {
  identifier: SectionIdentifier;
  section: SectionOptionObj;
}) {
  const { setPanel } = useSidebar();
  switch (section.type) {
    case "link": {
      const Icon = section.icon;
      const panelRef = useRef<PanelIdentifier>(identifier as PanelIdentifier);
      return (
        <SidebarMenuItem {...props}>
          <SidebarMenuButton className="hover:bg-transparent active:bg-transparent">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setPanel(panelRef.current);
                  }}
                  className="bg-dark:text-white size-8 rounded-full bg-transparent hover:bg-gray-200/10 focus:bg-gray-200/10 dark:text-white"
                >
                  {" "}
                  <Icon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{section.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }

    case "action":
      return (
        <SidebarMenuItem {...props}>
          <SidebarMenuButton className="hover:bg-transparent active:bg-transparent">
            <div>{section.icon}</div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
  }
}

export { SidebarSectionItem };
