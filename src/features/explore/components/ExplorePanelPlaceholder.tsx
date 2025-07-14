import React from "react";
import { LockIcon, UsersIcon } from "lucide-react";

export function ExplorePanelPlaceHolder() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <UsersIcon className="mb-6 h-10 w-10 text-gray-400" />

      <h2 className="mb-2 text-2xl font-semibold">Create communities</h2>
      <p className="max-w-xs text-center text-sm text-gray-400">
        Bring members together in topic-based groups and easily send them admin
        announcements.
      </p>

      <div className="absolute bottom-4 flex items-center text-sm text-gray-500">
        <LockIcon className="mr-1 h-4 w-4" />
        Your personal messages in communities are end-to-end encrypted
      </div>
    </div>
  );
}
