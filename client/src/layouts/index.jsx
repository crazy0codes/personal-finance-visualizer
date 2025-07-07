
import { Sidebar } from "@/components/sidebar"
import { Outlet } from "react-router-dom";


export function DashboardLayout() {
  return (
    <main>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
            <Outlet /> 
          </main>
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;