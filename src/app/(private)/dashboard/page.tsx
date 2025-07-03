import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default async function WhatsappPage() {
  const { user } = useUser();
  /*
  return if user is a falsy value:
  null, undefined, 0, NaN, una cadena vacía 
  */
  if (!user) {
    return redirect("/");
  }

  const rootChat = "";

  if (!rootChat) {
  }
}
