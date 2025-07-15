import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import React from "react";
import { cn } from "~/lib/utils";

const bubbleVariants = cva(
  "flex size-8 cursor-pointer items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        gray: "bg-transparent hover:bg-ghost-gray focus:bg-ghost-gray",
        green: "bg-green-500 hover:bg-green-500/50 text-black",
      },
      defaultVariants: {
        variant: "gray",
      },
    },
  },
);

export function BubbleIcon({
  className,
  variant,
  Icon,
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & { Icon: LucideIcon }) {
  return (
    <div className={cn(bubbleVariants({ variant }), className)}><Icon className="size-5"/></div>
  );
}
