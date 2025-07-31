import type { LucideIcon } from "lucide-react";
import { BubbleIcon } from "./bubble-icon";
import { Button } from "./button";

export function BubbleAction({
  Icon,
  ...props
}: React.ComponentProps<"button"> & { Icon: LucideIcon }) {
  return (
    <Button {...props} variant="ghost" size="icon">
      <BubbleIcon variant="gray" Icon={Icon} />
    </Button>
  );
}
