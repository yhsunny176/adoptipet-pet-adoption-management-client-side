import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { user, loading, logOut } = useAuth();

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
        </div>
    );
};

export default LogoutButton;
