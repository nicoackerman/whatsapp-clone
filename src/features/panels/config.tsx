import React, { lazy, type JSX } from "react";
import { RightChatPanel } from "../messages/components/RightChatPanel";
import { LeftChatPanel } from "../messages/components/LeftChatPanel";

// Lazy load for secondary panels
const LeftExplorePanel = lazy(
  () => import("../explore/components/panels/LeftExplorePanel"),
);
const RightExplorePanel = lazy(
  () => import("../explore/components/panels/RightExplorePanel"),
);

// Handles the names of the app sections
type PanelIdentifier = "messages" | "contacts";
type AppPanelRecord = Record<PanelIdentifier, BiPanelObj>;

interface BiPanelObj {
  leftPanel: JSX.Element;
  rightPanel: JSX.Element;
}

// Record type does not allow multiple key panels to be the same
// This avoids repetion mistakes
const APP_PANELS: AppPanelRecord = {
  messages: {
    leftPanel: <LeftChatPanel />,
    rightPanel: <RightChatPanel />,
  },
  contacts: {
    leftPanel: <LeftExplorePanel />,
    rightPanel: <RightExplorePanel />,
  },
};

export { type PanelIdentifier, type AppPanelRecord, APP_PANELS };
