"use client";

import React from "react";
import { cn } from "~/lib/utils";

export default function ChatHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex justify-between", className)} {...props} />;
}