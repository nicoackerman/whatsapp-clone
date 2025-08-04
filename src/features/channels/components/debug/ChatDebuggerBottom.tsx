"use client";

import { Button } from "~/components/ui/button";
import { SheetFooter, SheetClose } from "~/components/ui/sheet";

export default function ChatDebuggerBottom({
  ...props
}: React.ComponentProps<"div">) {
  return <SheetFooter {...props} />;
}