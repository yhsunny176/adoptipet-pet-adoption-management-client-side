import MainLayout from "@/layouts/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
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
        path: "/*",
        element: <ErrorPage />,
    },
]);

export default router;
