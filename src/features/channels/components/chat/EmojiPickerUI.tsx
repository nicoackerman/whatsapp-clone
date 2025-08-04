import { StickerIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Theme, type PickerProps } from "emoji-picker-react";
import { Skeleton } from "~/components/ui/skeleton";
const EmojiPicker = lazy(() => import("emoji-picker-react"));

export default function EmojiPickerUI(props: PickerProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <BubbleIcon variant="gray" Icon={StickerIcon} />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="border-transparent bg-transparent"
      >
        <Suspense
          fallback={
            <div className="p-2">
              <Skeleton className="h-[400px] w-[600px] rounded-md" />
            </div>
          }
        >
          <EmojiPicker {...props} theme={Theme.DARK} />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
}
