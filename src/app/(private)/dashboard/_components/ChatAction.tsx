import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

export function ChatAction() {
  return (
    <Button className="flex items-center justify-start gap-6 bg-transparent py-7 text-left text-sm hover:bg-gray-200/10 dark:text-white">
      <div>
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold">Felipe</span>
        <p className="line-clamp-1">I just asked bla bla</p>
      </div>
    </Button>
  );
}