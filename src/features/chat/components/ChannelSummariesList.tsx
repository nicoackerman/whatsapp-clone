"use client";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  ChatListSkeleton,
  NoChannelsAvailable,
} from "./ui/ChatPreviewSkeletons";
import ChannelSummaryWrapper from "./ui/ChannelSummaryWrapper";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function ChannelSummariesList() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const channelSummaries = useQuery(
    api.channels.getChannelSummaries,
    isLoading || !isAuthenticated ? "skip" : undefined,
  );

  if (!channelSummaries) {
    return (
      <div className="flex grow flex-col space-y-3">
        <ChatListSkeleton />
      </div>
    );
  }

  if (channelSummaries.length == 0) {
    return (
      <div className="flex grow flex-col space-y-3">
        <NoChannelsAvailable />
      </div>
    );
  }

  const channels = [...channelSummaries];
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
      <ScrollArea className="size-full">
        {channels.map((summary) => (
          <ChannelSummaryWrapper
            key={summary.channelIdentifier}
            summary={summary}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
