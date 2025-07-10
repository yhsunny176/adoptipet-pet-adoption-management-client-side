import AuthenticationLayout from "@/layouts/Authentication/AuthenticationLayout";
import MainLayout from "@/layouts/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";
import React from "react";

import { createBrowserRouter } from "react-router";

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
        path: "/*",
        element: <ErrorPage />,
    },
]);

export default router;
