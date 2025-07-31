// import { api } from "@/convex/_generated/api";
// import type { Id } from "@/convex/_generated/dataModel";
// import { useQuery } from "convex/react";
// import React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
// import { useDraftStore } from "~/features/channels/hooks/useDraftStore";
// import { useChatStore } from "~/features/messages/hooks/useChatStore";
// import ChannelVisualsPlacehoder from "./ChannelVisualsPlaceholder";

// export const ChannelVisuals = () => {
//   const currentChanelIdentifier: Id<"channels"> | "placeholder" = useChatStore(
//     (state) => state.currentChannelIdentifier,
//   );
//   const allDrafts = useDraftStore((state) => state.drafts);

//   const thereIsDrafts = Object.keys(allDrafts).length == 0;
//   if (currentChanelIdentifier == "placeholder" && !thereIsDrafts) {
//     return <ChannelVisualsPlacehoder />;
//   }

//   if (currentChanelIdentifier == "placeholder" && thereIsDrafts) {
//      return (
//        <div className="space-y-4">
//          {Object.entries(allDrafts).map(([channelId, draft]) => (
//            <Card key={channelId} className="p-4">
//              <CardHeader>
//                <CardTitle className="text-muted-foreground text-sm">
//                  Canal: <span className="font-mono">{channelId}</span>
//                </CardTitle>
//              </CardHeader>
//              <CardContent>
//                <p className="text-sm whitespace-pre-wrap">{draft}</p>
//              </CardContent>
//            </Card>
//          ))}
//        </div>
//      );
//   }

//   const channelMembers = useQuery(api.channels.getRecivers, {
//     channelIdentifier: currentChanelIdentifier,
//   });
//   return (
//     <Card className="mx-auto w-full max-w-md rounded-2xl p-4 shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-xl">
//           Canal:{" "}
//           <span className="text-blue-600">{currentChannelIdentifier}</span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4 text-sm">
//         <div>
//           <strong>Miembros:</strong>
//           <ul className="text-muted-foreground list-inside list-disc">
//             {channelMembers.map((member, i) => (
//               <li key={i}>{member}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <strong>Mensajes:</strong>
//           <ul className="text-muted-foreground list-inside list-decimal">
//             {channelMessages.map((msg, i) => (
//               <li key={i}>{msg}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <strong>Borrador actual:</strong>
//           <p className="text-muted-foreground">
//             {channelDraft || "Sin contenido"}
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
