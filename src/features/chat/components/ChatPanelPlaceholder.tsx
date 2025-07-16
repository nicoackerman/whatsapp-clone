import React from "react";
import { Lock } from "lucide-react";
import Image from "next/image";

export function ChatPanelPlaceHolder() {
  return (
    <div className="flex size-full flex-col items-center justify-center px-8 py-10">
      <div className="flex grow flex-col items-center justify-center gap-4">
        <Image src={"/desktop-hero.png"} alt="Hero" width={320} height={188} />
        <div className="flex flex-col items-center">
          <p className="mt-5 mb-2 text-center text-3xl font-extralight">
            WhatsApp Web
          </p>
          <span className="text-soft-gray dark:text-soft-white w-3/4 text-center text-sm">
            Send and receive messages without keeping your phone online.
          </span>
          <span className="text-soft-gray dark:text-soft-white w-3/4 text-center text-sm">
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Lock size={20} />
        <p className="text-soft-gray dark:text-soft-white text-center text-xs">
          Your personal messages are end-to-end encrypted
        </p>
      </div>
    </div>
  );
}
