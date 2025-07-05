// import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import LeftPanel from "~/components/panels/LeftPanel";
import RightPanel from "~/components/panels/RightPanel";

export default async function WhatsappPage() {
  // const { user } = useUser();
  /*
  return if user is a falsy value:
  null, undefined, 0, NaN, una cadena vacía 
  */
  // if (!user) {
  //   return redirect("/");
  // }

  return (
    <main className="m-5">
      <p>hola mundo</p>
    </main>
  );
}
