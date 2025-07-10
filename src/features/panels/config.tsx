import React, { type JSX } from "react";

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
    leftPanel: <div>messages left</div>,
    rightPanel: <div>messages right</div>,
  },
  contacts: {
    leftPanel: <div>contacts left</div>,
    rightPanel: <div>contacts right</div>,
  },
};

export { type PanelIdentifier, type AppPanelRecord, APP_PANELS };
