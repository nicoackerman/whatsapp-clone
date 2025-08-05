"use client";

import ChannelContent from "./ChannelContent";
import ChannelHeader from "./ChannelHeader";
import ChannelInput from "./ChannelInput";

export default function ChannelDisplay() {
  return (
    <div className="flex h-screen w-full flex-col bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')]">
      <ChannelHeader className="border border-gray-700/10 bg-white p-4 dark:bg-[#161717]" />
      <ChannelContent />
      <ChannelInput />
    </div>
  );
}
