import React from "react";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-secondary.png";
import { useTheme } from "@/hooks/useTheme";
import { NavLink } from "react-router";
import { Facebook, Instagram } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Facebook01Icon, InstagramIcon, ThreadsIcon, TwitterIcon } from "@hugeicons/core-free-icons/index";

const Footer = () => {
    const { theme } = useTheme();
    return (
        <footer className="w-full bg-transparent">
            <div className="max-w-11/12 md:max-w-10/12 xl:max-w-9/12 mx-auto py-10">
                {/* Grid for 6 columns on xl+ screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 xl:gap-6">
                    {/* Logo & Text */}
                    <div className="space-y-5 xl:max-w-2xs flex-shrink-0 col-span-1">
                        <div>
                            {theme === "light" ? (
                                <img src={logo} alt="This is the logo of adoptipet" />
                            ) : (
                                <img src={logoDark} alt="This is the logo of adoptipet in dark mode" />
                            )}
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-2xl font-bold text-heading-color">AdoptiPet</h1>
                            <p className="text-pg-base">
                                Connecting loving homes with pets in need. Adopt, don’t shop!
                            </p>
                        </div>
                    </div>

                    {/* Basic Links */}
                    <div className="flex flex-col gap-4 min-w-[180px] col-span-1">
                        <h1 className="text-lg text-heading-color font-bold">Explore</h1>
                        <ul className="flex flex-col gap-4 items-start">
                            <li>
                                <NavLink
                                    to="/"
                                    className="text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/pet-listing"
                                    className="text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Pet Listings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/donation-campaigns"
                                    className="text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Donation Campaigns
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div className="flex flex-col gap-4 min-w-[180px] col-span-1">
                        <h1 className="text-lg text-heading-color font-bold">Useful Links</h1>
                        <ul className="flex flex-col gap-4 items-start">
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className="text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/auth/login"
                                    className="text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/auth/register"
                                    className="text-navitem-base hover:text-base-rose-dark transition-colors duration-500 ease-in-out">
                                    Sign Up
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Social links */}
                    <div className="flex flex-col items-start md:gap-6 col-span-1">
                        <h1 className="text-center text-xl font-bold text-base-rose">Follow Us:</h1>
                        <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
                            <a href="https://www.facebook.com/yeasinulhaqsani" className="w-max h-max">
                                <HugeiconsIcon icon={Facebook01Icon} size={24} className="text-heading-color" />
                            </a>
                            <a href="http://instagram.com/" className="w-max h-max">
                                <HugeiconsIcon icon={InstagramIcon} size={24} className="text-heading-color" />
                            </a>
                            <a href="https://x.com/yeasinul_haq" className="w-max h-max">
                                <HugeiconsIcon icon={TwitterIcon} size={24} className="text-heading-color" />
                            </a>
                            <a href="https://www.threads.com/@yeasinul_haque_sani" className="w-max h-max">
                                <HugeiconsIcon icon={ThreadsIcon} size={24} className="text-heading-color" />
                            </a>
                        </div>
                    </div>

                    {/* Empty columns for 6 total on xl+ screens */}
                    <div className="hidden xl:block col-span-1"></div>
                    <div className="hidden xl:block col-span-1"></div>
                </div>
                {/* Divider and copyright */}
                <hr className="my-8 border-t border-pg-base/50" />
                <div className="flex justify-center">
                    <span className="text-sm md:text-base font-medium text-gray-medium text-center font-pg">
                        &copy; {new Date().getFullYear()} AdoptiPet. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
