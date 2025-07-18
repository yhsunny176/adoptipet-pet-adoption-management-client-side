import React from "react";
import AuthenticationLayout from "@/layouts/Authentication/AuthenticationLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import AddPets from "@/pages/dashboard/user/AddPets";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import PetListing from "@/pages/PetListing";
import CategoryPetsPage from "@/pages/CategoryPetsPage";
import SinglePetDetail from "@/pages/SinglePetDetail";
import MyAddedPets from "@/pages/dashboard/user/MyAddedPets";
import UpdatePetData from "@/pages/dashboard/user/UpdatePetData";
import AdoptionRequests from "@/pages/dashboard/user/AdoptionRequests";
import CreateDonations from "@/pages/dashboard/user/CreateDonations";
import MyDonationCampaigns from "@/pages/dashboard/user/MyDonationCampaigns";
import UpdateCampaign from "@/pages/dashboard/user/UpdateCampaign";
import AllDonationCampaigns from "@/pages/AllDonationCampaigns";
import DonationCampaignDetail from "@/pages/DonationCampaignDetail";
import MyDonations from "@/pages/dashboard/user/MyDonations";

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
                path: "add-pet",
                element: (
                    <PrivateRoute>
                        <AddPets />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-added-pets/:email",
                element: (
                    <PrivateRoute>
                        <MyAddedPets />
                    </PrivateRoute>
                ),
            },
            {
                path: "adoption-requests/:email",
                element: (
                    <PrivateRoute>
                        <AdoptionRequests />
                    </PrivateRoute>
                ),
            },
            {
                path: "create-donation-campaign",
                element: (
                    <PrivateRoute>
                        <CreateDonations />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-donation-campaigns/:email",
                element: (
                    <PrivateRoute>
                        <MyDonationCampaigns />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-donations/:email",
                element: (
                    <PrivateRoute>
                        <MyDonations />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/category-pets/:category",
        element: <CategoryPetsPage />,
    },
    {
        path: "/pet-listing",
        element: <PetListing />,
    },
    {
        path: "/pet-detail/:id",
        element: <SinglePetDetail />,
    },
    {
        path: "/pet-update/:id",
        element: (
            <PrivateRoute>
                <UpdatePetData />
            </PrivateRoute>
        ),
    },
    {
        path: "/update-donation-campaign/:id",
        element: (
            <PrivateRoute>
                <UpdateCampaign />
            </PrivateRoute>
        ),
    },
    {
        path: "/donation-campaigns",
        element: <AllDonationCampaigns />,
    },
    {
        path: "/donation-detail/:id",
        element: <DonationCampaignDetail />,
    },
    {
        path: "/*",
        element: <ErrorPage />,
    },
]);

export default router;
