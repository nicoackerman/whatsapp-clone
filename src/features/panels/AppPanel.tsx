"use client";

import React from "react";

import { useSidebar } from "~/components/ui/sidebar";
import { APP_PANELS } from "./config";
import { RequireAuth } from "~/components/logic/RequireAuth";

/* 
  Handles the bipanel pattern for the app
  * Gets the current bipanel components
  * Handles unauthenticated users
  * Renders UI for bipanel
*/

function AppPanel() {
  return (
    <RequireAuth>
      <BipanelDisplay />
    </RequireAuth>
  );
}

function BipanelDisplay() {
  const { currentPanelId } = useSidebar();

  const currentPanel = React.useMemo(() => {
    return APP_PANELS[currentPanelId];
  }, [currentPanelId]);

  return (
    <section className="flex h-screen flex-grow flex-row">
      <article className="h-screen w-2/7 min-w-[340px] border-x border-gray-700/20 bg-white px-2 py-4 dark:bg-[#161717]">
        {currentPanel.leftPanel}
      </article>
      <article className="h-screen grow bg-[#F7F5F3] dark:bg-[#1e2020]">
        {" "}
        {currentPanel.rightPanel}
      </article>
    </section>
  );
}

export { AppPanel };
