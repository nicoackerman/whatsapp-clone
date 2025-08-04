"use client";

import React from "react";

export default function ChatHeaderRight({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className="flex items-center gap-3" {...props} />;
}