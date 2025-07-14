import React, { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-secondary.png";
import { Menu11Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import "react-loading-skeleton/dist/skeleton.css";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import LogoutButton from "../buttons-custom/LogoutButton";
import Avatar from "../avatar/Avatar";

const Navbar = () => {
    const [mobMenuOpen, setMobMenuOpen] = useState(false);
    const { theme } = useTheme();

    // Automatically close mobile menu (Sheet) on resize to lg+
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <nav className="max-w-full py-8 bg-background-secondary">
                <div className="nav-container mx-auto max-w-11/12 2xl:max-w-10/12">
                    <NavigationMenu className="flex justify-between items-center w-full" viewport={false}>
                        {/* Logo */}
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <div className="w-32 h-auto">
                                    <Link to="/">
                                        {theme === "dark" ? (
                                            <img
                                                src={logoDark}
                                                alt="Logo Dark"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                                        )}
                                    </Link>
                                </div>
                            </NavigationMenuItem>
                        </NavigationMenuList>

                        {/* Desktop Navigation Links */}
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavLink
                                    to="/"
                                    className="hidden lg:block text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Home
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink
                                    to="/pet-listing"
                                    className="hidden lg:block text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Pet Listing
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink
                                    to="/donations"
                                    className="hidden lg:block text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Donation Campaigns
                                </NavLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavLink
                                    to="/contact"
                                    className="hidden lg:block text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Contact
                                </NavLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>

                        <NavigationMenuList>
                            {/* Avatar and Theme Toggle */}
                            <NavigationMenuItem className="flex items-center gap-2 sm:gap-3">
                                {/* Avatar */}

                                <Avatar />

                                {/* Theme Toggle */}
                                <ThemeToggle />
                            </NavigationMenuItem>
                            {/* Desktop Nav */}
                            <NavigationMenuItem className="hidden lg:block ml-4">
                                <LogoutButton />
                            </NavigationMenuItem>
                            {/* Hamburger Menu */}
                            <div className="flex items-center lg:hidden ml-auto justify-end">
                                <Sheet open={mobMenuOpen} onOpenChange={setMobMenuOpen}>
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 text-menu-mobile active:text-base-rose-dark">
                                            <HugeiconsIcon icon={Menu11Icon} size={28} className="h-7 w-7" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[80vw] max-w-xs bg-base-white">
                                        <div className="flex flex-col gap-6 mt-18 px-6">
                                            <NavLink
                                                to="/"
                                                className="text-lg text-navitem-base-mb hover:text-navitem-hover transition-colors py-2">
                                                Home
                                            </NavLink>
                                            <NavLink
                                                to="/pet-listing"
                                                className="text-lg text-navitem-base-mb hover:text-navitem-hover transition-colors py-2">
                                                Pet Listing
                                            </NavLink>
                                            <NavLink
                                                to="/donations"
                                                className="text-lg text-navitem-base-mb hover:text-navitem-hover transition-colors py-2">
                                                Donation Campaigns
                                            </NavLink>
                                            <NavLink
                                                to="/contact"
                                                className="text-lg text-navitem-base-mb hover:text-navitem-hover transition-colors py-2">
                                                Contact
                                            </NavLink>
                                            <div className="pt-4">
                                                <LogoutButton />
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
