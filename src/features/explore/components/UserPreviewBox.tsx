import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import type { Doc } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "~/../convex/_generated/api";

export function UserPreviewBox(props: { user: Doc<"users"> }) {
  const addContact = useMutation(api.users.addContact)
  const user = props.user;
  
  return (
    <div className="flex h-14 cursor-pointer items-center justify-between gap-3 bg-transparent p-4 hover:bg-gray-200/10 dark:text-white">
      <Avatar className="size-10">
        <AvatarImage src={user.profileImg} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex grow flex-col items-start">
        <h3 className="text-base font-bold">{user.fullName}</h3>
      </div>
      <Button
        variant="outline"
        className="cursor-pointer rounded-full px-6 py-0"
        onClick={(e: React.MouseEvent<HTMLButtonElement>)=> {
          e.preventDefault();
          addContact({userId: user._id})
        }}
      >
        Add
      </Button>
    </div>
  );
}
