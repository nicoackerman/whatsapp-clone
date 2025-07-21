import { ScrollArea } from "~/components/ui/scroll-area";
import { MoreVertical } from "lucide-react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { useQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";
import UserList from "../ui/UserList";
import NoUsersAvailable from "../ui/NoUsersAvialable";

export default function LeftExplorePanel() {
  const users = useQuery(api.users.getAll);

  return (
    <div className="flex h-full grow flex-col justify-start space-y-7">
      <div className="flex w-full items-center justify-between px-4">
        <p className="text-xl font-bold dark:text-white">Explore</p>
        <BubbleIcon Icon={MoreVertical} variant={"gray"} />
      </div>
      <ScrollArea className="h-[700px] w-full whitespace-nowrap">
        {!users || users.length == 0 ? (
          <NoUsersAvailable />
        ) : (
          <UserList users={users} />
        )}
      </ScrollArea>
    </div>
  );
}
