import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "../ui/sidebar";
import { NavLink } from "react-router";
import logo from "@/assets/logo.svg";
import logoDark from "@/assets/logo-secondary.svg";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    AddMoneyCircleIcon,
    FileUploadIcon,
    HeartAddIcon,
    InvoiceIcon,
    Payment02Icon,
} from "@hugeicons/core-free-icons/index";
import { DogIcon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import LogoutButton from "../buttons-custom/LogoutButton";

const data = {
    navMain: [
        {
            items: [
                {
                    title: "Add a Pet",
                    url: "/dashboard/add-pet",
                    icon: <HugeiconsIcon icon={HeartAddIcon} />,
                },
                {
                    title: "My Added Pets",
                    url: "/dashboard/my-added-pet",
                    icon: <DogIcon strokeWidth={1.25} />,
                },
                {
                    title: "Adoption Request",
                    url: "/dashboard/adoption-request",
                    icon: <HugeiconsIcon icon={FileUploadIcon} />,
                },
                {
                    title: "Create Donation Campaigns",
                    url: "/dashboard/create-donation-campaigns",
                    icon: <HugeiconsIcon icon={AddMoneyCircleIcon} />,
                },
                {
                    title: "My Donation Campaigns",
                    url: "/dashboard/my-donation-campaigns",
                    icon: <HugeiconsIcon icon={InvoiceIcon} />,
                },
                {
                    title: "My Donations",
                    url: "/dashboard/my-donations",
                    icon: <HugeiconsIcon icon={Payment02Icon} />,
                },
            ],
        },
    ],
};

const SidebarDashboard = (props) => {
    const { theme } = useTheme();

    return (
        <Sidebar {...props}>
            <div className="bg-sidebar-secondary max-w-full px-3 pb-4 h-max flex items-center justify-between mt-5 border-b border-b-black-base">
                <div className="max-w-24 h-full">
                    {theme === "light" ? (
                        <img src={logo} alt="adoptipet brand logo" className="w-full h-full" />
                    ) : (
                        <img src={logoDark} alt="adoptipet brand logo for dark mode theme" className="w-full h-full" />
                    )}
                </div>
            </div>
            <SidebarContent className={"py-8 px-3 bg-sidebar-secondary"}>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarMenu>
                        {item.items.map((child) => (
                            <SidebarMenuItem key={child.title}>
                                <NavLink
                                    to={child.url}
                                    className={({ isActive }) =>
                                        `flex items-center gap-4 rounded-md px-3 py-2 text-md transition-colors duration-500 ease-in-out ${
                                            isActive
                                                ? "bg-sidebar-nav-hover text-sidebar-navitem-text-hover font-semibold"
                                                : "text-sidebar-navitem-text hover:bg-sidebar-nav-hover hover:font-semibold"
                                        }`
                                    }>
                                    <span className="mb-1">{child.icon}</span>
                                    {child.title}
                                </NavLink>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                ))}
            </SidebarContent>
            <SidebarFooter className="py-6">
                <LogoutButton />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};

export default SidebarDashboard;
