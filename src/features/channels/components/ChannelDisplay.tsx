import MessageComposerProvider from "../providers/MessageComposerProvider";
import ChannelContent from "./ChannelContent";
import ChannelHeader from "./ChannelHeader";
import ChannelInput from "./ChannelInput";

export default function ChannelDisplay() {
  return (
    <div className="flex h-screen w-full flex-col bg-[url('/bg-light.png')] dark:bg-[url('/bg-dark.png')]">
      <ChannelHeader className="border border-gray-700/10 bg-white p-4 dark:bg-[#161717]" />
      <ChannelContent className="" />
      <MessageComposerProvider>
        <ChannelInput className="gap-2 rounded-full bg-white px-4 py-1 dark:bg-[#1e2020]" />
      </MessageComposerProvider>
    </div>
  );
}
