import { SendIcon, StickerIcon } from "lucide-react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export default function ChannelInput({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="bg-transparent px-2 py-4">
      <div className={cn("flex w-full justify-between", className)} {...props}>
        <BubbleIcon variant="gray" Icon={StickerIcon} />
        <Input
          placeholder="Type a message"
          className="w-full border-none bg-transparent text-white focus:ring-0 focus:outline-none"
        />
        <BubbleIcon variant="green" Icon={SendIcon} />
      </div>
    </div>
  );
}
