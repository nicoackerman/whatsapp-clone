import React, { type JSX } from "react";
import { RightChatPanel } from "../chat/components/RightChatPanel";
import { LeftChatPanel } from "../chat/components/LeftChatPanel";
import { LeftExplorePanel } from "../explore/components/LeftExplorePanel";
import { RightExplorePanel } from "../explore/components/RightExplorePanel";

// Handles the names of the app sections
type PanelIdentifier = "messages" | "contacts";
type AppPanelRecord = Record<PanelIdentifier, BiPanelObj>;

interface BiPanelObj {
  leftPanel: JSX.Element;
  rightPanel: JSX.Element;
}

// Reconrd type does not allow multiple key panels to be the same
// This avoids repetion mistakes
const APP_PANELS: AppPanelRecord = {
  messages: {
    leftPanel: <LeftChatPanel />,
    rightPanel: <RightChatPanel />,
  },
  contacts: {
    leftPanel: <LeftExplorePanel/>,
    rightPanel: <RightExplorePanel/>,
  },
};

export { type PanelIdentifier, type AppPanelRecord, APP_PANELS };
