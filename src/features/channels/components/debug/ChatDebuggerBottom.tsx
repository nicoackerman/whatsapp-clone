"use client";

import { SheetFooter } from "~/components/ui/sheet";

export default function ChatDebuggerBottom({
  ...props
}: React.ComponentProps<"div">) {
  return <SheetFooter {...props} />;
}
