"use client";
import React from "react";
import { useSidebar } from "~/components/ui/sidebar";
import { APP_PANELS } from "./config";

function AppPanel() {
  const { currentPanelId } = useSidebar();

  // Gets current panel based on the sidebar last section opened
  const currentPanel = React.useMemo(() => {
    return APP_PANELS[currentPanelId];
  }, [currentPanelId]);

  return (
    <section className="flex h-screen flex-grow flex-row">
      <article className="h-screen w-2/7 border-x-1 border-gray-700 bg-[#161717] p-3">
        {currentPanel.leftPanel}
      </article>
      <article className="h-screen grow bg-[#161717]">
        {currentPanel.rightPanel}
      </article>
    </section>
  );
}

export { AppPanel };
