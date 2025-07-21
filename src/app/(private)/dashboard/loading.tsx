import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-primary-black flex h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src="/public/whatsapp.png"
          width={500}
          height={500}
          alt="WhatsApp Logo"
        />
        <h1 className="text-lg font-medium text-black opacity-80 dark:text-white">
          WhatsApp
        </h1>
        <div className="text-soft-gray dark:text-soft-white mt-2 flex items-center space-x-1 text-sm">
          <Lock className="h-4 w-4" />
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}
