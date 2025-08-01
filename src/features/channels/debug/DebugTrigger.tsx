import { BugPlayIcon } from "lucide-react";
import { BubbleAction } from "~/components/ui/bubble-action";
import {
  type MessageDebuggerSchema,
  useMessageDebugger,
} from "../hooks/useMessageDebugger";
import DebuggerUI from "./DebuggerUI";

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
      {messageDebugger.open && <DebuggerUI />}
    </>
  );
}
