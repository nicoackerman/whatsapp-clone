
import { SidebarProvider } from "~/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={{
        minWidth: "28rem",
        "--sidebar-width": "28rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      {children}
    </SidebarProvider>
  );
}
