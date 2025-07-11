"use client";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import type { PanelIdentifier } from "~/features/panels/config";
import { SidebarMenuItem, useSidebar } from "~/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type SectionIdentifier, type SectionOptionObj } from "./config";
import { BubbleIcon } from "~/components/ui/bubble-icon";

function SidebarSectionItem({
  identifier,
  section,
  ...props
}: React.ComponentProps<"li"> & {
  identifier: SectionIdentifier;
  section: SectionOptionObj;
}) {
  const { setPanel } = useSidebar();
  const sectionIdentifier = useRef<SectionIdentifier>(identifier);
  switch (section.type) {
    case "link": {
      const Icon = section.icon;
      const selectedPanel = sectionIdentifier.current as PanelIdentifier;
      return (
        <SidebarMenuItem {...props}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setPanel(selectedPanel);
                }}
                className="bg-dark:text-white size-8 rounded-full bg-transparent hover:bg-gray-200/10 focus:bg-gray-200/10 dark:text-white"
              >
                <BubbleIcon Icon={Icon}/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{section.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
      );
    }

    case "action":
      return (
        <SidebarMenuItem {...props}>
          <div>{section.icon}</div>
        </SidebarMenuItem>
      );
  }
}

export { SidebarSectionItem };
