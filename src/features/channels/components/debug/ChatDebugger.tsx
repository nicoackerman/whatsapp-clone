"use client";

import { Sheet } from "lucide-react";
import { Button } from "~/components/ui/button";
import { SheetTrigger, SheetContent } from "~/components/ui/sheet";

export default function ChannelDebugger({
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