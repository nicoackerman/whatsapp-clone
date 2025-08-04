"use client";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";

export default function ChatDebugger({
  children,
}: React.ComponentProps<"div">) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>{children}</SheetContent>
    </Sheet>
  );
}
