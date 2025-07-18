import { ScrollArea } from "~/components/ui/scroll-area";
import { UserPreviewBox } from "./UserPreviewBox";
import { MoreVertical } from "lucide-react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { useQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";

export default function LeftExplorePanel() {
  const users = useQuery(api.users.getAll);

  if (!users || users.length == 0) {
    return (
      <div className="flex h-full grow flex-col justify-start space-y-7">
        <div className="flex w-full items-center justify-between px-4">
          <p className="text-xl font-bold dark:text-white">Explore</p>
          <BubbleIcon Icon={MoreVertical} variant={"gray"} />
        </div>
        <p>No users available</p>
      </div>
    );
  }

  return (
    <div className="flex h-full grow flex-col justify-start space-y-7">
      <div className="flex w-full items-center justify-between px-4">
        <p className="text-xl font-bold dark:text-white">Explore</p>
        <BubbleIcon Icon={MoreVertical} variant={"gray"} />
      </div>
      <ScrollArea className="h-[700px] w-full whitespace-nowrap">
        <div className="flex grow flex-col space-y-3">
          {users.map((user) => (
            <UserPreviewBox key={user._id} user={user} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
