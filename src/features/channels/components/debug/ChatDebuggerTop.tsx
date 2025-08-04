"use client";

import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "~/components/ui/sheet";

export default function ChannelDebuggerTop({
  children,
}: React.ComponentProps<"div">) {
  return (
    <SheetHeader>
      <SheetTitle>Debug current Chat</SheetTitle>
      <SheetDescription>Debug this chat comfortably</SheetDescription>
      {children}
    </SheetHeader>
  );
}
