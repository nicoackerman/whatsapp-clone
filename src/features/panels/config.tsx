import React, { type JSX } from "react";
import { RightChatPanel } from "../chat/ChatPanels";
import { LeftChatPanel } from "../chat/LeftChatPanel";
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
    leftPanel: <div>contacts left</div>,
    rightPanel: <div>contacts right</div>,
  },
};

export { type PanelIdentifier, type AppPanelRecord, APP_PANELS };
