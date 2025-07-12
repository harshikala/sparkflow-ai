
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../hooks/useAuth";

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return null; // This will redirect to login in useAuth
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-hidden bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
