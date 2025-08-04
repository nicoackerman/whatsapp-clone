"use client";

export default function ChatDebuggerIndicator({
  ...props
}: React.ComponentProps<"div">) {
  return <div className="flex flex-col gap-4" {...props} />;
}