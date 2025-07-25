import { cn } from "~/lib/utils";

export default function ThreadContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex grow flex-col", className)} {...props}>
      Hola!!
    </div>
  );
}
