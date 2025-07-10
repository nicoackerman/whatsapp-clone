import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export function PreviewChatBox({}) {
  return (
    <Button className="cursor-pointer flex items-center justify-between gap-3 bg-transparent p-4 hover:bg-gray-200/10 dark:text-white h-14">
      <Avatar className="size-10">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col grow items-start">
        <h3 className="text-base font-bold">Felipe</h3>
        <p className="line-clamp-1">I just asked bla bla</p>
      </div>
    </Button>
  );
}
