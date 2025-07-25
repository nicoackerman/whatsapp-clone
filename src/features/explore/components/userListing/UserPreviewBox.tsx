import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { User } from "../../types";
import CreateThreadButton from "./CreateThreadButton";

export function UserPreviewBox({ user }: { user: User }) {
  return (
    <div className="flex h-14 cursor-pointer items-center justify-between gap-3 bg-transparent p-4 hover:bg-gray-200/10 dark:text-white">
      <Avatar className="size-10">
        <AvatarImage src={user.profileImg} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex grow flex-col items-start">
        <h3 className="text-xs font-bold">{user.firstName}</h3>
      </div>
      <CreateThreadButton userIdentifier={user._id} />
    </div>
  );
}
