import React from "react";
import { Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

export function ChatPanelPlaceHolder() {
  return (
    <div className="bg-gray-secondary flex size-full flex-col items-center justify-center py-10">
      <div className="flex w-full flex-col items-center justify-center gap-4 py-10">
        <Image src={"/desktop-hero.png"} alt="Hero" width={320} height={188} />
        <p className="mt-5 mb-2 text-3xl font-extralight">
          Download WhatsApp for Windows
        </p>
        <p className="text-gray-primary text-muted-foreground w-1/2 text-center text-sm">
          Make calls, share your screen and get a faster experience when you
          download the Windows app.
        </p>

        <Button className="bg-green-primary hover:bg-green-secondary my-5 rounded-full">
          Get from Microsoft Store
        </Button>
      </div>
      <p className="text-gray-primary text-muted-foreground mt-auto flex w-1/2 items-center justify-center gap-1 text-center text-xs">
        <Lock size={10} /> Your personal messages are end-to-end encrypted
      </p>
    </div>
  );
}
