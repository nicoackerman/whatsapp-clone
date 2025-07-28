"use client";
import { useQuery } from "convex/react";
import NoThreadsAvailable from "./NoThreadsAvailable";
import { PreviewChatBox } from "./PreviewChatBox";
import { api } from "~/../convex/_generated/api";

export default function PreviewChatBoxList() {
  const threadSummaries = useQuery(api.threads.getSummary);

  if (!threadSummaries) {
    return (
      <div className="flex grow flex-col space-y-3">
        <NoThreadsAvailable />
      </div>
    );
  }

  if (threadSummaries.length == 0) {
    return (
      <div className="flex grow flex-col space-y-3">
        <NoThreadsAvailable />
      </div>
    );
  }

  return (
    <div className="flex grow flex-col space-y-3">
      {threadSummaries.map((summary) => (
        <PreviewChatBox key={summary.channelIdentifier} summary={summary} />
      ))}
    </div>
  );
}
