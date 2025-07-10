"use client";
import { MessagesSquare, Users, type LucideIcon } from "lucide-react";
import { type JSX } from "react";
import { ModeToggle } from "~/components/ui/mode-toggle";
import type { PanelIdentifier } from "~/features/panels/config";

interface SectionLinkObj {
  icon: LucideIcon;
  tooltip: string;
  type: "link";
}
interface SectionActionObj {
  icon: JSX.Element;
  tooltip: string;
  type: "action";
}

// allowed sections of the appp separated by Action and Panel identifiers pattern
type ActionIdentifier = "toogleMode";
type SectionIdentifier = PanelIdentifier | ActionIdentifier;

type SectionOptionObj = SectionActionObj | SectionLinkObj;

type AppSectionsRecord = Record<SectionIdentifier, SectionOptionObj>;
const APP_SECTIONS: AppSectionsRecord = {
  messages: {
    icon: MessagesSquare,
    tooltip: "Messages",
    type: "link",
  },
  contacts: {
    icon: Users,
    tooltip: "Contacts",
    type: "link",
  },
  toogleMode: {
    icon: <ModeToggle />,
    tooltip: "Toogle Theme Mode",
    type: "action",
  },
};

export { type SectionOptionObj, type SectionIdentifier, APP_SECTIONS };
