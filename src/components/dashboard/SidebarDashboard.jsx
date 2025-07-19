import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarRail } from "../ui/sidebar";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-secondary.png";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    AddMoneyCircleIcon,
    FileUploadIcon,
    HeartAddIcon,
    InvoiceIcon,
    MoneySavingJarIcon,
    Payment02Icon,
    UserMultiple02Icon,
} from "@hugeicons/core-free-icons/index";
import { DogIcon, Rabbit } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import LogoutButton from "../buttons-custom/LogoutButton";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import Skeleton from "react-loading-skeleton";

const SidebarDashboard = (props) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) {
        return <Skeleton />;
    }

    // Common menu items for both user and admin
    const commonMenuItems = [
        {
            title: "Add a Pet",
            url: "/dashboard/add-pet",
            icon: <HugeiconsIcon icon={HeartAddIcon} />,
        },
        {
            title: "My Added Pets",
            url: `/dashboard/my-added-pets/${user?.email}`,
            icon: <DogIcon strokeWidth={1.25} />,
        },
        {
            title: "Adoption Request",
            url: `/dashboard/adoption-requests/${user?.email}`,
            icon: <HugeiconsIcon icon={FileUploadIcon} />,
        },
        {
            title: "Create Donation Campaigns",
            url: "/dashboard/create-donation-campaign",
            icon: <HugeiconsIcon icon={AddMoneyCircleIcon} />,
        },
        {
            title: "My Donation Campaigns",
            url: `/dashboard/my-donation-campaigns/${user?.email}`,
            icon: <HugeiconsIcon icon={InvoiceIcon} />,
        },
        {
            title: "My Donations",
            url: `/dashboard/my-donations/${user?.email}`,
            icon: <HugeiconsIcon icon={Payment02Icon} />,
        },
    ];

    // Extra admin menu items
    const adminMenuItems = [
        {
            title: "Users",
            url: "/dashboard/admin/all-users",
            icon: <HugeiconsIcon icon={UserMultiple02Icon} />,
        },
        {
            title: "All Pets",
            url: "/dashboard/admin/all-pets",
            icon: <Rabbit strokeWidth={1.25}/>,
        },
        {
            title: "All Donations",
            url: "/dashboard/admin/all-donations",
            icon: <HugeiconsIcon icon={MoneySavingJarIcon} />,
        },
    ];

    // Choose menu items based on role
    const menuItems = role === "admin" ? [...commonMenuItems, ...adminMenuItems] : commonMenuItems;

    return (
        <Sidebar {...props}>
            <div className="bg-sidebar-secondary max-w-full px-3 pb-4 h-max flex items-center justify-between mt-5 border-b border-b-black-base">
                <div className="max-w-24 h-full">
                    {theme === "light" ? (
                        <Link to={"/"}>
                            <img src={logo} alt="AdoptiPet Logo" className="w-full h-full" />
                        </Link>
                    ) : (
                        <Link to={"/"}>
                            <img src={logoDark} alt="AdoptiPet Logo" className="w-full h-full" />
                        </Link>
                    )}
                </div>
            </div>
            <SidebarContent className={"py-8 px-3 bg-sidebar-secondary"}>
                <SidebarMenu>
                    {menuItems.map((child, cidx) => (
                        <SidebarMenuItem key={child.url || child.title || cidx}>
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
            </SidebarContent>
            <SidebarFooter className="py-6">
                <LogoutButton />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};

export default SidebarDashboard;
