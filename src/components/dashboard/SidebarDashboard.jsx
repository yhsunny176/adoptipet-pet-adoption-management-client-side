import React from "react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "../ui/sidebar";
import { NavLink } from "react-router";
import logo from "@/assets/logo.svg";

// This is sample data.
const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            items: [
                {
                    title: "Add a Pet",
                    url: "/dashboard/add-pet",
                },
                {
                    title: "My Added Pets",
                    url: "/dashboard/my-added-pet",
                },
                {
                    title: "Adoption Request",
                    url: "/dashboard/adoption-request",
                },
                {
                    title: "Create Donation Campaigns",
                    url: "/dashboard/create-donation-campaigns",
                },
                {
                    title: "My Donation Campaigns",
                    url: "/dashboard/my-donation-campaigns",
                },
                {
                    title: "My Donations",
                    url: "/dashboard/my-donations",
                },
            ],
        },
    ],
};

const SidebarDashboard = (props) => {
    return (
        <Sidebar {...props}>
            <div className="max-w-full px-3 pb-4 h-max flex items-center justify-between mt-5 border-b border-b-black-base">
                <div className="max-w-24 h-full">
                    <img src={logo} alt="adoptipet brand logo" className="w-full h-full" />
                </div>
            </div>
            <SidebarContent className={"py-8 px-3"}>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarMenu>
                        {item.items.map((child) => (
                            <SidebarMenuItem key={child.title}>
                                <SidebarMenuButton
                                size="lg"
                                    className={
                                        "text-md font-md text-base-pg hover:text-base-rose-dark transition-colors duration-500 ease-in-out"
                                    }
                                    asChild
                                    isActive={child.isActive}>
                                    <NavLink to={child.url}>{child.title}</NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};

export default SidebarDashboard;
