"use client";
import React, { type JSX } from "react";
import { useSidebar } from "~/components/ui/sidebar";
import { type PanelIdentifier, APP_PANELS } from "./config";

function AppPanel() {
  const { currentPanelId } = useSidebar();

  // Gets current panel based on the sidebar last section opened
  const currentPanel = React.useMemo(() => {
    return APP_PANELS[currentPanelId as PanelIdentifier];
  }, [currentPanelId]);

  return (
    <section className="flex h-full w-full flex-row">
      <article className="h-full w-1/3 bg-amber-400 p-4">
        {currentPanelId}
        {currentPanel.leftPanel}
      </article>
      <article className="h-full flex-grow bg-amber-400 p-4">
        {currentPanel.rightPanel}
      </article>
    </section>
  );
}

export { AppPanel };
