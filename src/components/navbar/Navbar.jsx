import React, { useContext, useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import avatarPlaceholder from "@/assets/panda-placeholder.png";
import { Menu11Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { AuthContext } from "@/contexts/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, logOut, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate("/auth/login", {
                    state: { message: "Logged out successfully!", type: "success" },
                });
            })
            .catch((error) => {
                navigate("/auth/login", {
                    state: { message: `${error.message}`, type: "error" },
                });
            });
    };

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
                        {loading ? (
                            <div className="flex-none relative">
                                <Skeleton circle width={40} height={40} className="animate-pulse" />
                            </div>
                        ) : user ? (
                            <div className="flex-none relative cursor-pointer">
                                <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={"User Avatar"}
                                            className="h-10 w-10 rounded-full object-cover hover:border-2 border-base-rose  hover:transform hover:scale-105 transition-transform duration-400 ease-in-out"
                                        />
                                    ) : (
                                        <img
                                            src={avatarPlaceholder}
                                            alt="User Avatar"
                                            className="h-10 w-10 rounded-full object-cover hover:border-2 border-base-rose  hover:transform hover:scale-105 transition-transform duration-400 ease-in-out"
                                        />
                                    )}
                                </div>

                                {/* Dropdown menu */}
                                <div
                                    className={`absolute right-0 space-y-4 px-2 text-center top-full mt-2 w-48 bg-base-white rounded-lg shadow-card-primary py-2 z-50 transform origin-top 
                                    transition-all duration-300 ease-in-out ${
                                        isDropdownOpen
                                            ? "opacity-100 scale-y-100 translate-y-0"
                                            : "opacity-0 scale-y-95 translate-y-2 pointer-events-none"
                                    }`}>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-black-text-500 hover:bg-red-light hover:text-base-red rounded-sm transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <Button
                                        onClick={() => {
                                            handleLogOut();
                                        }}
                                        size={"lg"}
                                        className="w-full bg-base-rose hover:bg-hover-rose-dark text-base-white">
                                        Logout
                                    </Button>
                                </div>

                                {/* Close dropdown when clicked outside of container */}
                                {isDropdownOpen && (
                                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                                )}
                            </div>
                        ) : null}
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        {loading ? (
                            <Skeleton width={100} height={40} borderRadius={6} className="animate-pulse" />
                        ) : user ? (
                            <Button
                                onClick={() => {
                                    handleLogOut();
                                }}
                                size={"lg"}
                                className="w-full bg-base-rose hover:bg-hover-rose-dark text-base-white">
                                Logout
                            </Button>
                        ) : (
                            <Button
                                size={"lg"}
                                className="w-full bg-base-rose hover:bg-hover-rose-dark text-base-white">
                                <Link to="/auth/login">Login</Link>
                            </Button>
                        )}
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
                                    {loading ? (
                                        <Skeleton width="100%" height={40} borderRadius={6} className="animate-pulse" />
                                    ) : user ? (
                                        <Button
                                            onClick={handleLogOut}
                                            size={"lg"}
                                            className="w-full bg-rose-dark hover:bg-hover-rose-dark">
                                            Logout
                                        </Button>
                                    ) : (
                                        <Button size={"lg"} className="w-full bg-rose-dark hover:bg-hover-rose-dark">
                                            <Link to="/auth/login">Login</Link>
                                        </Button>
                                    )}
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
