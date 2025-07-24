"use client";
import { useQuery } from "convex/react";
import NoThreadsAvailable from "../ui/NoThreadsAvailable";
import { PreviewChatBox } from "../ui/PreviewChatBox";
import { api } from "convex/_generated/api";

export default function PreviewChatBoxList() {
  const threads = useQuery(api.threads.getAll);

  if (!threads) {
    return (
      <div className="flex grow flex-col space-y-3">
        <NoThreadsAvailable />
      </div>
    );
  }

  if (threads.length == 0) {
    return (
      <div className="flex grow flex-col space-y-3">
        <NoThreadsAvailable />
      </div>
    );
  }

  return (
    <div className="flex grow flex-col space-y-3">
      {threads.map((thread) => (
        <PreviewChatBox key={thread._id} thread={thread} />
      ))}
    </div>
  );
}
