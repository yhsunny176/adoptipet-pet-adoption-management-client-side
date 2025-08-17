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
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import UserList from "@/pages/dashboard/admin/UserList";
import AllPets from "@/pages/dashboard/admin/AllPets";
import AllDonations from "@/pages/dashboard/admin/AllDonations";
import DashboardDefault from "./DashboardDefault";
import ForgetPassword from "@/pages/ForgetPassword";
import PetRecommendations from "@/pages/PetRecommendations";

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
            {
                path: "/donation-campaigns",
                element: <AllDonationCampaigns />,
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
                path: "/pet-recommendations",
                element: (
                    <PrivateRoute>
                        <PetRecommendations />
                    </PrivateRoute>
                ),
            },
            {
                path: "/pet-detail/:id",
                element: <SinglePetDetail />,
            },
            {
                path: "/donation-detail/:id",
                element: <DonationCampaignDetail />,
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
                <UserRoute>
                    <DashboardLayout />
                </UserRoute>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardDefault />,
            },
            {
                path: "add-pet",
                element: (
                    <PrivateRoute>
                        <UserRoute>
                            <AddPets />
                        </UserRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "my-added-pets/:email",
                element: (
                    <PrivateRoute>
                        <UserRoute>
                            <MyAddedPets />
                        </UserRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "adoption-requests/:email",
                element: (
                    <PrivateRoute>
                        <UserRoute>
                            <AdoptionRequests />
                        </UserRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "create-donation-campaign",
                element: (
                    <PrivateRoute>
                        <UserRoute>
                            <CreateDonations />
                        </UserRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "my-donation-campaigns/:email",
                element: (
                    <PrivateRoute>
                        <UserRoute>
                            <MyDonationCampaigns />
                        </UserRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "my-donations/:email",
                element: (
                    <PrivateRoute>
                        <UserRoute>
                            <MyDonations />
                        </UserRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "admin/all-users",
                element: (
                    <PrivateRoute>
                        <AdminRoute>
                            <UserList />
                        </AdminRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "admin/all-pets",
                element: (
                    <PrivateRoute>
                        <AdminRoute>
                            <AllPets />
                        </AdminRoute>
                    </PrivateRoute>
                ),
            },
            {
                path: "admin/all-donations",
                element: (
                    <PrivateRoute>
                        <AdminRoute>
                            <AllDonations />
                        </AdminRoute>
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/pet-update/:id",
        element: (
            <PrivateRoute>
                <UserRoute>
                    <UpdatePetData />
                </UserRoute>
            </PrivateRoute>
        ),
    },
    {
        path: "/admin/pet-update/:id",
        element: (
            <PrivateRoute>
                <AdminRoute>
                    <UpdatePetData />
                </AdminRoute>
            </PrivateRoute>
        ),
    },
    {
        path: "/update-donation-campaign/:id",
        element: (
            <PrivateRoute>
                <UserRoute>
                    <UpdateCampaign />
                </UserRoute>
            </PrivateRoute>
        ),
    },
    {
        path: "/admin/update-donation-campaign/:id",
        element: (
            <PrivateRoute>
                <AdminRoute>
                    <UpdateCampaign />
                </AdminRoute>
            </PrivateRoute>
        ),
    },
    {
        path: "/forget-password",
        element: <ForgetPassword />,
    },
    {
        path: "/*",
        element: <ErrorPage />,
    },
]);

export default router;
