import React from "react";
import AuthenticationLayout from "@/layouts/Authentication/AuthenticationLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import AddPets from "@/pages/dashboard/AddPets";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import PetListing from "@/pages/PetListing";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthenticationLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Registration />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "/dashboard/add-pet",
                element: (
                    <PrivateRoute>
                        <AddPets />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/pet-listing",
        element: <PetListing/>
    },
    {
        path: "/*",
        element: <ErrorPage />,
    },
]);

export default router;
