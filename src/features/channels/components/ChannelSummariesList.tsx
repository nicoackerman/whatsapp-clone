"use client";
import { useQuery } from "convex/react";
import NoChannelsAvailable from "./NoChannelsAvailable";
import ChannelSummaryWrapper from "./ChannelSummaryWrapper";
import { api } from "@/convex/_generated/api";

export default function ChannelSummariesList() {
  // const serversSummaries = useQuery(api.servers.)
  const threadSummaries = useQuery(api.threads.getSummary);

  if (!threadSummaries) {
    return (
      <div className="flex grow flex-col space-y-3">
        <NoChannelsAvailable />
      </div>
    );
  }

  if (threadSummaries.length == 0) {
    return (
      <div className="flex grow flex-col space-y-3">
        <NoChannelsAvailable />
      </div>
    );
  }

  const channels = [...threadSummaries];
  return (
    <div className="flex grow flex-col space-y-3">
      {channels.map((summary) => (
        <ChannelSummaryWrapper
          key={summary.channelIdentifier}
          summary={summary}
        />
      ))}
    </div>
  );
}
