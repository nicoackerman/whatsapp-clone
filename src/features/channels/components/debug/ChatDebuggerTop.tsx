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
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you&apos;re done.
      </SheetDescription>
      {children}
    </SheetHeader>
  );
}