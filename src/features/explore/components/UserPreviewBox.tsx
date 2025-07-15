import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { type User } from "./dummy-data";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { CheckIcon } from "lucide-react";

interface UserPreviewBoxProps {
  user: User;
}

export function UserPreviewBox(props: UserPreviewBoxProps) {
  const user = props.user;
  return (
    <div className="flex h-14 cursor-pointer items-center justify-between gap-3 bg-transparent p-4 hover:bg-gray-200/10 dark:text-white">
      <Avatar className="size-10">
        <AvatarImage src={user.userImage} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex grow flex-col items-start">
        <h3 className="text-base font-bold">{user.userName}</h3>
      </div>
      {user.isContact ? (
        <BubbleIcon Icon={CheckIcon} />
      ) : (
        <Button
          variant="outline"
          className="cursor-pointer rounded-full px-6 py-0"
        >
          Add
        </Button>
      )}
    </div>
  );
}
