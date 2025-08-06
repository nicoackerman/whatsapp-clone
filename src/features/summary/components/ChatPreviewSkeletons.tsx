import { MessageCircle } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

export function ChatListSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex h-10 items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NoChannelsAvailable() {
  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center space-y-4 p-8">
      <MessageCircle className="h-10 w-10" />
      <p className="text-center text-sm">
        No messages yet. Start a conversation to see it here.
      </p>
    </div>
  );
}
