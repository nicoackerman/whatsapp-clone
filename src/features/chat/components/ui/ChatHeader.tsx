"use client";

import React from "react";
import { cn } from "~/lib/utils";
import { MoreVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "~/components/ui/dropdown-menu";

export function ChatHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex justify-between", className)} {...props} />;
}

ChatHeader.Left = function Left({ ...props }: React.ComponentProps<"div">) {
  return <div className="flex items-center gap-4" {...props} />;
};

ChatHeader.Right = function Right({ ...props }: React.ComponentProps<"div">) {
  return <div className="flex items-center gap-3" {...props} />;
};

ChatHeader.Menu = function Menu({ children }: React.ComponentProps<"div">) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ChannelHeaderMenuItemProps {
  alt: string;
  shortcut: string;
}

ChatHeader.MenuItem = function MenuItem({
  alt,
  shortcut,
}: ChannelHeaderMenuItemProps) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem>
        {alt}
        <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};
