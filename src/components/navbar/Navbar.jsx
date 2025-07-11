import React, { useContext, useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import logoDark from "@/assets/logo-secondary.svg";
import avatarPlaceholder from "@/assets/panda-placeholder.png";
import { Menu11Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { AuthContext } from "@/contexts/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mobMenuOpen, setMobMenuOpen] = useState(false);
    const { user, logOut, loading } = useContext(AuthContext);
    const { theme } = useTheme();
    const navigate = useNavigate();

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
        <div className="container mx-auto px-2 sm:px-4">
            <NavigationMenu className="flex justify-between items-center w-full" viewport={false}>
                {/* Logo */}
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <div className="w-32 h-auto">
                            <Link to="/">
                                <img
                                    src={theme === "dark" ? logoDark : logo}
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                />
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
                            to="/pets"
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
                        {loading ? (
                            <Skeleton circle width={36} height={36} className="animate-pulse" />
                        ) : user ? (
                            <div className="flex-none relative cursor-pointer">
                                <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={"User Avatar"}
                                            className="h-9 w-9 rounded-full object-cover hover:border-2 border-base-rose hover:transform hover:scale-105 transition-transform duration-400 ease-in-out"
                                        />
                                    ) : (
                                        <img
                                            src={avatarPlaceholder}
                                            alt="User Avatar"
                                            className="h-9 w-9 rounded-full object-cover hover:border-2 border-base-rose hover:transform hover:scale-105 transition-transform duration-400 ease-in-out"
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
                                        className="block px-4 py-2 text-black-text-500 hover:bg-red-light hover:text-red-base rounded-sm transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <Button
                                        onClick={() => {
                                            handleLogOut();
                                        }}
                                        size={"lg"}
                                        className="w-full bg-base-rose hover:bg-base-rose-dark text-base-white">
                                        Logout
                                    </Button>
                                </div>
                                {isDropdownOpen && (
                                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                                )}
                            </div>
                        ) : null}
                        {/* Theme Toggle */}
                        <ThemeToggle />
                    </NavigationMenuItem>
                    {/* Desktop Nav */}
                    <NavigationMenuItem className="hidden lg:block ml-4">
                        {loading ? (
                            <Skeleton width={100} height={40} borderRadius={6} className="animate-pulse" />
                        ) : user ? (
                            <Button
                                onClick={() => {
                                    handleLogOut();
                                }}
                                size={"lg"}
                                className="w-full bg-base-rose hover:bg-base-rose-dark text-base-white">
                                Logout
                            </Button>
                        ) : (
                            <Button size={"lg"} className="w-full bg-base-rose hover:bg-base-rose-dark text-base-white">
                                <Link to="/auth/login">Login</Link>
                            </Button>
                        )}
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
                                        to="/pets"
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
                                        {loading ? (
                                            <Skeleton
                                                width="100%"
                                                height={40}
                                                borderRadius={6}
                                                className="animate-pulse"
                                            />
                                        ) : user ? (
                                            <Button
                                                onClick={handleLogOut}
                                                size={"lg"}
                                                className="w-full text-base-white bg-base-rose hover:bg-base-rose-dark">
                                                Logout
                                            </Button>
                                        ) : (
                                            <Button
                                                size={"lg"}
                                                className="w-full bg-base-rose text-base-white hover:bg-base-rose-dark">
                                                <Link to="/auth/login">Login</Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default Navbar;
