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
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
    const [mobMenuOpen, setMobMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme } = useTheme();
    const { user } = useAuth();

    // Handle scroll effect for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <div className={`bg-background-secondary transition-all duration-300 ${
            isScrolled
                ? 'shadow-md backdrop-blur-md bg-background-secondary/95'
                : ''
        }`}>
            <nav className={`main-container transition-all duration-300 ${
                isScrolled ? 'py-4' : 'py-8'
            }`}>
                <div className="nav-container w-full">
                    <NavigationMenu className="flex items-center w-full" viewport={false}>
                        {/* Left side: Logo and Nav Links */}
                        <div className="flex items-center lg:gap-8 xl:gap-12 2xl:gap-20">
                            {/* Logo */}
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <div className="max-w-[7rem] w-24 sm:w-32 h-auto flex-shrink-0">
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
                                        className="hidden xl:block text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                        Home
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink
                                        to="/pet-listing"
                                        className="hidden xl:block text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                        Pet Listing
                                    </NavLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavLink
                                        to="/donation-campaigns"
                                        className="hidden xl:block text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                        Donation Campaigns
                                    </NavLink>
                                </NavigationMenuItem>
                                {user && (
                                    <NavigationMenuItem>
                                        <NavLink
                                            to="/pet-recommendations"
                                            className="hidden xl:block text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                            Pet Recommendations
                                        </NavLink>
                                    </NavigationMenuItem>
                                )}
                                {user && (
                                    <NavigationMenuItem>
                                        <NavLink
                                            to="/leave-review"
                                            className="hidden xl:block text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                            Leave Review
                                        </NavLink>
                                    </NavigationMenuItem>
                                )}
                            </NavigationMenuList>
                        </div>

                        {/* Right side: Avatar, Theme, Logout, Hamburger */}
                        <div className="flex items-center ml-auto">
                            <NavigationMenuList>
                                {/* Avatar and Theme Toggle */}
                                <NavigationMenuItem className="flex items-center gap-3 sm:gap-4 min-w-0">
                                    {/* Avatar */}
                                    <div className="min-w-[28px] w-8 h-8 sm:min-w-[36px] sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center">
                                        <Avatar />
                                    </div>
                                    {/* Theme Toggle */}
                                    <div className="mr-2">
                                        <ThemeToggle />
                                    </div>
                                </NavigationMenuItem>
                            </NavigationMenuList>

                            <NavigationMenuList>
                                {/* Desktop Nav */}
                                <NavigationMenuItem className="hidden lg:block ml-4">
                                    <LogoutButton />
                                </NavigationMenuItem>

                                {/* Hamburger Menu */}
                                <div className="flex items-center xl:hidden">
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
                                                    to="/donation-campaigns"
                                                    className="text-lg text-navitem-base-mb hover:text-navitem-hover transition-colors py-2">
                                                    Donation Campaigns
                                                </NavLink>
                                                {user && (
                                                    <NavLink
                                                        to="/pet-recommendations"
                                                        className="text-lg text-navitem-base-mb hover:text-navitem-hover transition-colors py-2">
                                                        Pet Recommendations
                                                    </NavLink>
                                                )}
                                                {user && (
                                                    <NavLink
                                                        to="/leave-review"
                                                        className="text-lg text-navitem-base-mb hover:text-navitem-hover transition-colors py-2">
                                                        Leave Review
                                                    </NavLink>
                                                )}
                                                <div className="pt-4">
                                                    <LogoutButton />
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </NavigationMenuList>
                        </div>
                    </NavigationMenu>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
