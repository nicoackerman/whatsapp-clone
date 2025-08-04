"use client";

import React from "react";

export default function ChatHeaderLeft({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className="flex items-center gap-4" {...props} />;
}