import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";
import TopNavbar from "../components/TopNavbar";
import { ToastNotification } from "../components/ToastNotification";
import useMain from "../context/MainProvider";
import { useEffect } from "react";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Welcome back to your CRM overview" },
  "/leads": { title: "Leads", subtitle: "Manage and track all your leads" },
  "/sales": { title: "Sales", subtitle: "Monitor your sales pipeline" },
  "/agents": { title: "Agents", subtitle: "Manage your team of agents" },
  "/reports": { title: "Reports", subtitle: "View analytics and reports" },
  "/settings": { title: "Settings", subtitle: "Configure your workspace" },
  "/profile": { title: "User Profile", subtitle: "View and manage your account details" },
  "/leads/:id": { title: "Lead Management", subtitle: "View and manage lead details" },
};

export default function MainLayout() {
  const location = useLocation();
  const { title, subtitle } = pageTitles[location.pathname] ?? pageTitles["/"];
  const { isPending, toastNotification, isNotificationActive, setPage, dispatch } = useMain();

  useEffect(() => {
    setPage(1);
    dispatch({ type: "AGENT", value: "" });
    dispatch({ type: "STATUS", value: "" });
    dispatch({ type: "SORT", value: "" });
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppSidebar />

      <div className="ml-64 flex min-h-screen flex-1 flex-col">
        {isNotificationActive && (
          <ToastNotification
            toastNotification={toastNotification}
            isPending={isPending}
          />
        )}
        <TopNavbar title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
