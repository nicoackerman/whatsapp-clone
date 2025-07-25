import { MoreVertical } from "lucide-react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import MessagableUsers from "../userListing/MessagableUsers";

export default function LeftExplorePanel() {
  return (
    <div className="flex h-full grow flex-col justify-start space-y-7">
      <div className="flex w-full items-center justify-between px-4">
        <p className="text-xl font-bold dark:text-white">Explore</p>
        <BubbleIcon Icon={MoreVertical} variant={"gray"} />
      </div>
      <MessagableUsers />
    </div>
  );
}
