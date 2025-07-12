import SidebarDashboard from "@/components/dashboard/SidebarDashboard";
import ThemeToggle from "@/components/ThemeToggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
    return (
        <>
            <SidebarProvider>
                <SidebarDashboard />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-light px-4">
                        <div className="w-full flex justify-between">
                            <div className="flex items-center gap-4">
                                <SidebarTrigger/>
                                <div className="flex items-center gap-8 mt-1">
                                    <NavLink to="/">Home</NavLink>
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </div>
                            </div>
                            {/* Theme Toggle */}
                            <ThemeToggle />
                        </div>
                    </header>
                    <div className="w-full h-full py-6 px-6">
                        <Outlet />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};

export default DashboardLayout;
