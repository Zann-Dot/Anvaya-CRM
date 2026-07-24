import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";
import TopNavbar from "../components/TopNavbar";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Welcome back to your CRM overview" },
  "/leads": { title: "Leads", subtitle: "Manage and track all your leads" },
  "/sales": { title: "Sales", subtitle: "Monitor your sales pipeline" },
  "/agents": { title: "Agents", subtitle: "Manage your team of agents" },
  "/reports": { title: "Reports", subtitle: "View analytics and reports" },
  "/settings": { title: "Settings", subtitle: "Configure your workspace" },
};

export default function MainLayout() {
  const location = useLocation();
  const { title, subtitle } = pageTitles[location.pathname] ?? pageTitles["/"];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppSidebar />

      <div className="ml-64 flex min-h-screen flex-1 flex-col">
        <TopNavbar title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
