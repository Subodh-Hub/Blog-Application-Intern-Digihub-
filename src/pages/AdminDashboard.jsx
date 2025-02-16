import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/context/ThemeProvider";

const AdminDashboard = ({ children }) => {
  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AdminDashboard;
