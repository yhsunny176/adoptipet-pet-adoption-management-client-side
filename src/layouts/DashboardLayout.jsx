import Avatar from "@/components/avatar/Avatar";
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
                    <div className="flex flex-col h-full">
                        <header className="sticky top-0 z-10 flex h-20 shrink-0 items-center gap-2 border-b border-gray-light px-4 bg-background-secondary">
                            <div className="w-full flex justify-between">
                                <div className="flex items-center gap-4">
                                    <SidebarTrigger/>
                                    <div className="db-navitems flex items-center gap-8 mt-1 text-pg-base">
                                        <NavLink className="hover:text-base-rose-dark" to="/">Home</NavLink>
                                    </div>
                                </div>
                                {/* Theme Toggle */}
                                <div className="flex items-center gap-4">
                                    <Avatar />
                                    <ThemeToggle />
                                </div>
                            </div>
                        </header>
                        <div className="flex-1 overflow-auto w-full py-6 px-6">
                            <Outlet />
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};

export default DashboardLayout;
