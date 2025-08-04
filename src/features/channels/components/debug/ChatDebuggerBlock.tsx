"use client";

import { JsonBlock, type JsonBlockProps } from "~/components/ui/json-viewer";

export default function ChatDebuggerBlock({ ...props }: JsonBlockProps) {
  return <JsonBlock {...props} />;
}
