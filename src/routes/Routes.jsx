import MainLayout from "@/layouts/MainLayout";
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
]);

export default router;
