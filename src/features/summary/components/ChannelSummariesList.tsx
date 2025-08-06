"use client";
import { useConvexAuth, useQuery } from "convex/react";
import ChannelSummaryWrapper from "./ChannelSummaryWrapper";
import { api } from "@/convex/_generated/api";
import {
  ChatListSkeleton,
  NoChannelsAvailable,
} from "./ChatPreviewSkeletons";

export default function ChannelSummariesList() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  // const serversSummaries = useQuery(api.servers.)
  const threadSummaries = useQuery(
    api.threads.getSummary,
    isLoading || !isAuthenticated ? "skip" : undefined,
  );

  if (!threadSummaries) {
    return (
      <div className="flex grow flex-col space-y-3">
        <ChatListSkeleton />
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
