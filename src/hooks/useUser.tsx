import { api } from "@/convex/_generated/api";
import { useConvexAuth, useQuery } from "convex/react";

export default function useUser() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const me = useQuery(
    api.users.getMe,
    isLoading || !isAuthenticated ? "skip" : undefined,
  );

  return { me };
}
