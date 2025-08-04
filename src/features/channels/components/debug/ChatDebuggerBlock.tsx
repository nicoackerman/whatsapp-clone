"use client";

import { JsonBlock, type JsonBlockProps } from "~/components/ui/json-viewer";

export default function ChatDebuggerBlock({ data }: { data: JsonBlockProps }) {
  return <JsonBlock data={data} />;
}