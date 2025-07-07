import type { LucideIcon } from "lucide-react";
import type { JSX } from "react";
import { Button } from "~/components/ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface SectionLink {
  icon: LucideIcon;
  tooltip: string;
  identifier: string;
  type: "link";
}
interface SectionAction {
  icon: JSX.Element;
  tooltip: string;
  identifier: string;
  type: "action";
}

type SectionOption = SectionAction | SectionLink;

function SidebarSectionItem({
  section,
  ...props
}: React.ComponentProps<"li"> & { section: SectionOption }) {
  switch (section.type) {
    case "link": {
      const Icon = section.icon;
      return (
        <SidebarMenuItem {...props}>
          <SidebarMenuButton className="hover:bg-transparent">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="bg-dark:text-white size-8 rounded-full bg-transparent hover:bg-gray-200/10 dark:text-white">
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
          <SidebarMenuButton className="hover:bg-transparent">
            {section.icon}
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
  }
}

export { type SectionOption, SidebarSectionItem };
