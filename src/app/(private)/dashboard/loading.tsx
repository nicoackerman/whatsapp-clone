import React from "react";
import { Lock } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-primary-black flex h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <img
          src="/public/whatsapp.png"
          alt="WhatsApp Logo"
          className="h-16 w-16 opacity-60"
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
