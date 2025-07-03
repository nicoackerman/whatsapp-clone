// import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
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
      <div className="bg-left-panel mx-auto flex h-[calc(100vh-50px)] max-w-[1700px] overflow-y-hidden">
        {/* Green background decorator for Light Mode */}
        <div className="bg-green-primary fixed top-0 left-0 -z-30 h-36 w-full dark:bg-transparent" />
        <LeftPanel />
        <RightPanel />
      </div>
    </main>
  );
}
