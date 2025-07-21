import { useUser } from "@clerk/nextjs";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && !isSignedIn) throw Error("Unauthenticated User");

  return <>{children}</>;
}
