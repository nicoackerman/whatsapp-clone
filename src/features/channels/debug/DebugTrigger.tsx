import { BugPlayIcon } from "lucide-react";
import { BubbleAction } from "~/components/ui/bubble-action";
import {
  type MessageDebuggerSchema,
  useMessageDebugger,
} from "../hooks/useMessageDebugger";

interface DebugTriggerProps {}

export default function DebugTrigger({}: DebugTriggerProps) {
  const messageDebugger: MessageDebuggerSchema = useMessageDebugger(
    (state) => state,
  );
  return (
    <>
      <BubbleAction
        onClick={() => {
          messageDebugger.toggle();
        }}
        Icon={BugPlayIcon}
      />
      {messageDebugger.open && (
        <div className="fixed top-0 left-0 z-10 h-dvh">
          <h1>Debugger</h1>
        </div>
      )}
    </>
  );
}
