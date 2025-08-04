"use client";

import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "~/components/ui/dropdown-menu";

interface ChannelHeaderMenuItemProps {
  alt: string;
  shortcut: string;
}

export default function ChatHeaderMenuItem({
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
}