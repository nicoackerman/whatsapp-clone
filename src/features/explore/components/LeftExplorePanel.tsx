import { ScrollArea } from "~/components/ui/scroll-area";
import { UserPreviewBox } from "./UserPreviewBox";
import { MoreVertical } from "lucide-react";
import { users } from "./dummy-data"
import { BubbleIcon } from "~/components/ui/bubble-icon";
export function LeftExplorePanel() {
  return (
    <div className="flex h-full grow flex-col justify-start space-y-7">
      <div className="flex w-full items-center justify-between px-4">
        <p className="text-2xl font-bold">Explore</p>
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
