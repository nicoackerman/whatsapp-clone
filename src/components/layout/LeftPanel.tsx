import {
  ListFilter,
  LogOut,
  MessageSquareDiff,
  Search,
  User,
} from "lucide-react";
import { Input } from "../ui/input";
import ThemeSwitch from "./theme-switch";

const LeftPanel = () => {
  const conversations = [];

  return (
    <div className="w-1/4 border-r border-gray-600">
      <div className="bg-left-panel sticky top-0 z-10">
        {/* Header */}
        <div className="bg-gray-primary flex items-center justify-between p-3">
          <User size={24} />

          <div className="flex items-center gap-3">
            <MessageSquareDiff size={20} />{" "}
            {/* TODO: This line will be replaced with <UserListDialog /> */}
            <ThemeSwitch />
            <LogOut size={20} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center p-3">
          {/* Search */}
          <div className="relative mx-3 h-10 flex-1">
            <Search
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 transform text-gray-500"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search or start a new chat"
              className="bg-gray-primary w-full rounded py-2 pl-10 text-sm shadow-sm focus-visible:ring-transparent"
            />
          </div>
          <ListFilter className="cursor-pointer" />
        </div>
      </div>

      {/* Chat List */}
      <div className="my-3 flex max-h-[80%] flex-col gap-0 overflow-auto">
        {/* Conversations will go here*/}

        {conversations?.length === 0 && (
          <>
            <p className="mt-3 text-center text-sm text-gray-500">
              No conversations yet
            </p>
            <p className="mt-3 text-center text-sm text-gray-500">
              We understand {"you're"} an introvert, but {"you've"} got to start
              somewhere 😊
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default LeftPanel;
