import { AuthContext } from "@/contexts/AuthContext";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router";
import avatarPlaceholder from "@/assets/panda-placeholder.png";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";

const Avatar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, logOut, loading } = useAuth();
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
        <div>
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
        </div>
    );
};

export default Avatar;
