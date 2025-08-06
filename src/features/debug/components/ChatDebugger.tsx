"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { JsonBlock, type JsonBlockProps } from "~/components/ui/json-viewer";
import { ScrollArea } from "~/components/ui/scroll-area";
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
      <ScrollArea className="flex h-[500px] w-fit gap-10 rounded-md border border-none bg-transparent px-1">
        {children}
      </ScrollArea>
    </SheetHeader>
  );
};

ChatDebugger.Bottom = function Bottom({
  ...props
}: React.ComponentProps<"div">) {
  return <SheetFooter {...props} />;
};

ChatDebugger.Indicator = function Indicator({
  ...props
}: React.ComponentProps<"div">) {
  return <div className="my-6 flex flex-col gap-2" {...props} />;
};

ChatDebugger.Title = function Title({
  children,
}: Readonly<React.ComponentProps<"div">>) {
  return <div className="text-soft-white mt-4">{children}</div>;
};

ChatDebugger.Block = function Block({ ...props }: JsonBlockProps) {
  return <JsonBlock {...props} />;
};
