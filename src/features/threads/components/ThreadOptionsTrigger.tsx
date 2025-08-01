import { MoreVertical } from "lucide-react";
import { BubbleIcon } from "~/components/ui/bubble-icon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
interface ThreadOptionsProps {
  children: React.ReactNode;
}

export default function ThreadOptions({}: ThreadOptionsProps) {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <BubbleIcon Icon={MoreVertical} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
