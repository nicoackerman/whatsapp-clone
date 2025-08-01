"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Badge } from "~/components/ui/badge";
import { Hash, MessageSquare, Users, FileText } from "lucide-react";
import { JsonBlock } from "~/components/ui/json-viewer";

interface DebuggerUIProps {}

export default function DebuggerUI({}: DebuggerUIProps) {
  const myObject = {
    name: "Alice",
    age: 30,
    city: "New York",
  };

  // Convert the object to a JSON string
  const jsonString = myObject;

  return (
    <aside className="bg-background fixed bottom-0 left-0 z-10 flex size-[400px] flex-col border-r">
      {/* Current Channel */}
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <Hash className="text-muted-foreground h-5 w-5" />
          <h2 className="text-lg font-semibold">
            sampleData.currentChannelIdentifier
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-4">
            {/* Drafts Section */}
            <section className="rounded-lg border">
              <header className="flex items-center gap-2 border-b px-4 py-3 text-sm">
                <FileText className="h-4 w-4" />
                Drafts
                <Badge variant="secondary" className="ml-auto">
                  sampleData.drafts.length
                </Badge>
              </header>
              <div className="px-4 py-2">
                <JsonBlock
                  data={jsonString}
                  name="drafts"
                  defaultExpanded={true}
                  maxLevel={2}
                />
              </div>
            </section>

            {/* Messages Section */}
            <section className="rounded-lg border">
              <header className="flex items-center gap-2 border-b px-4 py-3 text-sm">
                <MessageSquare className="h-4 w-4" />
                Messages
                <Badge variant="secondary" className="ml-auto">
                  sampleData.messages.length
                </Badge>
              </header>
              <div className="px-4 py-2">
                <JsonBlock
                  data={jsonString}
                  name="messages"
                  defaultExpanded={false}
                  maxLevel={1}
                />
              </div>
            </section>

            {/* Users Section */}
            <section className="rounded-lg border">
              <header className="flex items-center gap-2 border-b px-4 py-3 text-sm">
                <Users className="h-4 w-4" />
                Channel Members
                <Badge variant="secondary" className="ml-auto">
                  sampleData.usersOfCurrentChannel.filteonline
                </Badge>
              </header>
              <div className="px-4 py-2">
                <JsonBlock
                  data={jsonString}
                  name="users"
                  defaultExpanded={false}
                  maxLevel={1}
                />
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
