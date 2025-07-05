import { Navigator } from "./_components/Navigator";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigator />
      <main>{children}</main>
    </>
  );
}
