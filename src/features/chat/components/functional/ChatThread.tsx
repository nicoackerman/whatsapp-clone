import ThreadContent from "./ThreadContent";
import ThreadHeader from "./ThreadHeader";
import ThreadInput from "./ThreadInput";

export default function ChatThread() {
  return (
    <div className="flex h-screen w-full flex-col bg-[url(public/bg-light.png)] dark:bg-[url(public/bg-dark.png)]">
      <ThreadHeader className="border border-gray-700/10 bg-white p-4 dark:bg-[#161717]" />
      <ThreadContent className="" />
      <ThreadInput className="gap-2 rounded-full bg-white px-4 py-1 dark:bg-[#1e2020]" />
    </div>
  );
}
