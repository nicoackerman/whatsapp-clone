import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";
import type { User } from "../../types";

export function UserPreviewBox({ user }: { user: User }) {
  return (
    <div className="flex h-14 cursor-pointer items-center justify-between gap-3 bg-transparent p-4 hover:bg-gray-200/10 dark:text-white">
      <Avatar className="size-10">
        <AvatarImage src={user.profileImg} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex grow flex-col items-start">
        <h3 className="text-xs font-bold">{user.fullName}</h3>
      </div>
      <ContactAction userId={user._id} />
    </div>
  );
}

function ContactAction({ userId }: { userId: User["_id"] }) {
  const myContacts = useQuery(api.users.getMyContacts);
  const isAlreadyContact = myContacts?.includes(userId);

  return (
    <>
      {isAlreadyContact ? (
        <DeleteContactButton userId={userId} />
      ) : (
        <AddContactButton userId={userId} />
      )}
      ;
    </>
  );
}
function AddContactButton({ userId }: { userId: User["_id"] }) {
  const addContact = useMutation(api.users.addContact);
  return (
    <Button
      variant="outline"
      className="cursor-pointer rounded-full px-6 py-0"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        void addContact({ userId: userId });
      }}
    >
      Add
    </Button>
  );
}
function DeleteContactButton({ userId }: { userId: User["_id"] }) {
  const deleteContact = useMutation(api.users.deleteContact);
  return (
    <Button
      variant="outline"
      className="cursor-pointer rounded-full px-6 py-0"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        void deleteContact({ userId: userId });
      }}
    >
      Delete
    </Button>
  );
}
