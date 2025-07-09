import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink } from "react-router";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import logo from "../../assets/logo.svg";
import { Menu11Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";

const Navbar = () => {
    return (
        <div className="container mx-auto px-4">
            <NavigationMenu className="flex justify-between w-full" viewport={false}>
                {/* Logo */}
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <div className="w-32 h-auto">
                            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                    </NavigationMenuItem>
                </NavigationMenuList>

                {/* Desktop Navigation Links */}
                <NavigationMenuList className="hidden lg:flex items-center gap-8">
                    <NavigationMenuItem>
                        <NavLink to="/" className="text-text-pg-base hover:text-text-rose-dark transition-colors">
                            Home
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink to="/pets" className="text-text-pg-base hover:text-text-rose-dark transition-colors">
                            Pet Listing
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink
                            to="/donations"
                            className="text-text-pg-base hover:text-text-rose-dark transition-colors">
                            Donation Campaigns
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink
                            to="/contact"
                            className="text-text-pg-base hover:text-text-rose-dark transition-colors">
                            Contact
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Button size={"lg"} className={"bg-rose-dark hover:bg-hover-rose-dark"}>
                            <Link to="/auth/login">Login</Link>
                        </Button>
                    </NavigationMenuItem>
                </NavigationMenuList>

                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-12 w-12 active:text-rose-dark">
                                <HugeiconsIcon icon={Menu11Icon} size={32} className="h-8 w-8" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] bg-white-bg">
                            <div className="flex flex-col gap-6 mt-18 px-6">
                                <NavLink
                                    to="/"
                                    className="text-lg text-text-pg-base hover:text-text-rose-dark transition-colors py-2">
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/pets"
                                    className="text-lg text-text-pg-base hover:text-text-rose-dark transition-colors py-2">
                                    Pet Listing
                                </NavLink>
                                <NavLink
                                    to="/donations"
                                    className="text-lg text-text-pg-base hover:text-text-rose-dark transition-colors py-2">
                                    Donation Campaigns
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    className="text-lg text-text-pg-base hover:text-text-rose-dark transition-colors py-2">
                                    Contact
                                </NavLink>
                                <div className="pt-4">
                                    <Button size={"lg"} className="w-full bg-rose-dark hover:bg-hover-rose-dark">
                                        <Link to="/auth/login">Login</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </NavigationMenu>
        </div>
    );
};

export default Navbar;
