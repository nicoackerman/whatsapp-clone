"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { JsonBlock, type JsonBlockProps } from "~/components/ui/json-viewer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function ChatDebugger({ children }: React.ComponentProps<"div">) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>{children}</SheetContent>
    </Sheet>
  );
}

ChatDebugger.Top = function Top({ children }: React.ComponentProps<"div">) {
  return (
    <SheetHeader>
      <SheetTitle>Debug current Chat</SheetTitle>
      <SheetDescription>Debug this chat comfortably</SheetDescription>
      {children}
    </SheetHeader>
  );
};

ChatDebugger.Bottom = function Bottom({ ...props }: React.ComponentProps<"div">) {
  return <SheetFooter {...props} />;
};

ChatDebugger.Indicator = function Indicator({ ...props }: React.ComponentProps<"div">) {
  return <div className="flex flex-col gap-4" {...props} />;
};

ChatDebugger.Title = function Title({ children }: Readonly<React.ComponentProps<"div">>) {
  return <div className="mt-4 text-soft-white">{children}</div>;
};

ChatDebugger.Block = function Block({ ...props }: JsonBlockProps) {
  return <JsonBlock {...props} />;
};