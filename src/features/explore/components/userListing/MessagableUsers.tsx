import { ScrollArea } from "~/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";
import UserList from "./UserList";
import NoUsersAvailable from "./NoUsersAvailable";

export default function MessagableUsers() {
  const users = useQuery(api.users.getMessagable);

  if (!users) {
    return <NoUsersAvailable />;
  }

  if (users.length == 0) {
    return <NoUsersAvailable />;
  }

  return (
    <ScrollArea className="h-[700px] w-full whitespace-nowrap">
      <UserList users={users} />
    </ScrollArea>
  );
}
