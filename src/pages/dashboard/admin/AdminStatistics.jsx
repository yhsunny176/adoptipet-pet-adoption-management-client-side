import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    UsersIcon,
    PawPrintIcon,
    DollarSignIcon,
    TrendingUpIcon,
    TargetIcon,
    ActivityIcon,
    DatabaseIcon,
} from "lucide-react";
import AddedPetsSkeleton from "@/components/loader/Skeletons/AddedPetsSkeleton";

const AdminStatistics = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all users data
    const { data: allUsersData = [], isLoading: usersLoading } = useQuery({
        queryKey: ["allUsersData"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-users`);
            return data;
        },
    });

    // Fetch all pets data
    const { data: allPetsData = [], isLoading: petsLoading } = useQuery({
        queryKey: ["allPetsData"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/admin/all-pets`);
            return data;
        },
    });

    // Fetch all donation campaigns data
    const { data: allDonationCampaignsResponse = {}, isLoading: campaignsLoading } = useQuery({
        queryKey: ["allDonationCampaigns"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/donation-campaigns`);
            return data;
        },
    });

    // Fetch all donations data
    const { data: allDonationsData = [], isLoading: donationsLoading } = useQuery({
        queryKey: ["allDonationsData"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/admin/dashboard/all-donations`);
            return data;
        },
    });

    if (usersLoading || petsLoading || campaignsLoading || donationsLoading) {
        return <AddedPetsSkeleton />;
    }

    // Calculate statistics
    const totalUsers = allUsersData.length;
    const adminUsers = allUsersData.filter((user) => user.role === "admin").length;
    const regularUsers = totalUsers - adminUsers;

    const totalPets = allPetsData.length;
    const adoptedPets = allPetsData.filter((pet) => pet.adopted).length;
    const availablePets = totalPets - adoptedPets;

    const allDonationCampaigns = allDonationCampaignsResponse.donations || [];
    const totalCampaigns = allDonationCampaigns.length;
    const activeCampaigns = allDonationCampaigns.filter((campaign) => !campaign.paused).length;
    const pausedCampaigns = totalCampaigns - activeCampaigns;

    const totalDonations = allDonationsData.length;
    const totalAmountRaised = allDonationsData.reduce(
        (sum, donation) => sum + (Number(donation.amount_donated) || 0),
        0
    );

    // Prepare chart data
    const userRoleData = [
        { name: "Regular Users", value: regularUsers, color: "#3b82f6" },
        { name: "Admins", value: adminUsers, color: "#8b5cf6" },
    ];

    const petStatusData = [
        { name: "Adopted", value: adoptedPets, color: "#22c55e" },
        { name: "Available", value: availablePets, color: "#f59e0b" },
    ];

    const campaignStatusData = [
        { name: "Active", value: activeCampaigns, color: "#22c55e" },
        { name: "Paused", value: pausedCampaigns, color: "#ef4444" },
    ];

    // Pet categories data
    const categoryData = allPetsData.reduce((acc, pet) => {
        const category = pet.category || "Other";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const petCategoryData = Object.entries(categoryData).map(([category, count]) => ({
        category,
        count,
    }));

    // Monthly registration data (assuming createdAt field exists)
    const monthlyRegistrations = allUsersData.reduce((acc, user) => {
        if (user.createdAt) {
            const month = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
            acc[month] = (acc[month] || 0) + 1;
        }
        return acc;
    }, {});

    const registrationData = Object.entries(monthlyRegistrations)
        .map(([month, count]) => ({ month, registrations: count }))
        .slice(-6); // Last 6 months

    const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#f97316"];

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-heading-color mb-2">Admin Dashboard Statistics</h1>
                <p className="text-pg-base">Overview of platform-wide statistics and system metrics</p>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Total Users</CardTitle>
                        <UsersIcon className="h-8 w-8" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalUsers}</div>
                        <p className="text-sm mt-3">
                            {adminUsers} admins, {regularUsers} regular users
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Total Pets</CardTitle>
                        <PawPrintIcon className="h-8 w-8" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalPets}</div>
                        <p className="text-sm mt-3">
                            {adoptedPets} adopted, {availablePets} available
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Donation Campaigns</CardTitle>
                        <TargetIcon className="h-8 w-8" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCampaigns}</div>
                        <p className="text-sm mt-3">
                            {activeCampaigns} active, {pausedCampaigns} paused
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Total Donations</CardTitle>
                        <DollarSignIcon className="h-8 w-8" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalDonations}</div>
                        <p className="text-sm mt-3">${totalAmountRaised.toFixed(2)} raised</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Role Distribution */}
                <Card className="px-3 py-4 md:px-6 md:py-8">
                    <CardHeader>
                        <CardTitle className="text-xl lg:text-2xl text-heading-color font-bold">
                            User Role Distribution
                        </CardTitle>
                        <CardDescription className={"text-gray-dark text-base"}>
                            Distribution of users by role
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {totalUsers > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={userRoleData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value">
                                        {userRoleData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[300px] text-center">
                                <UsersIcon className="h-16 w-16 text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-500 mb-2">No Users Found</h3>
                                <p className="text-sm text-gray-400">User data will appear here</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pet Status Distribution */}
                <Card className="px-3 py-4 md:px-6 md:py-8">
                    <CardHeader>
                        <CardTitle className="text-xl lg:text-2xl text-heading-color font-bold">
                            Pet Adoption Status
                        </CardTitle>
                        <CardDescription className={"text-gray-dark text-base"}>
                            Platform-wide pet adoption status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {totalPets > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={petStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value">
                                        {petStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[300px] text-center">
                                <PawPrintIcon className="h-16 w-16 text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-500 mb-2">No Pets Found</h3>
                                <p className="text-sm text-gray-400">Pet data will appear here</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pet Categories Bar Chart */}
                {petCategoryData.length > 0 && (
                    <Card className={"col-span-1 lg:col-span-2 py-4 px-4 md:py-8 md:px-6"}>
                        <CardHeader>
                            <CardTitle className={"text-xl lg:text-2xl text-heading-color font-bold"}>
                                Pets by Category
                            </CardTitle>
                            <CardDescription className={"text-gray-dark text-base mb-8"}>
                                Distribution of all pets across different categories
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={petCategoryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )}

                <div className="col-span-full">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                        <Card className={" py-4 rounded-xl"}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-600">
                                    <TrendingUpIcon className="h-5 w-5 text-green-500" />
                                    Adoption Rate
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-green-600 mb-3">
                                    {totalPets > 0 ? Math.round((adoptedPets / totalPets) * 100) : 0}%
                                </div>
                                <p className="text-sm text-pg-base">Platform-wide adoption success rate</p>
                            </CardContent>
                        </Card>

                        <Card className={" py-4 rounded-xl"}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-600">
                                    <ActivityIcon className="h-5 w-5 text-blue-500" />
                                    Active Campaigns
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-blue-600 mb-3">{activeCampaigns}</div>
                                <p className="text-sm text-pg-base">Currently running donation campaigns</p>
                            </CardContent>
                        </Card>

                        <Card className={" py-4 rounded-xl"}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-purple-500 dark:text-purple-400">
                                    <DatabaseIcon className="h-5 w-5 text-purple-500" />
                                    Platform Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-purple-600 mb-3">
                                    {totalUsers + totalPets + totalDonations}
                                </div>
                                <p className="text-sm text-pg-base">Total platform entities</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Campaign Status Distribution */}
                {totalCampaigns > 0 && (
                    <Card className="px-3 py-4 md:px-6 md:py-8">
                        <CardHeader>
                            <CardTitle className="text-xl lg:text-2xl text-heading-color font-bold">
                                Campaign Status
                            </CardTitle>
                            <CardDescription className={"text-gray-dark text-base"}>
                                Distribution of donation campaign status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={campaignStatusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value">
                                        {campaignStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )}

                {/* User Registration Trend */}
                {registrationData.length > 0 && (
                    <Card className={"col-span-1 lg:col-span-2 py-4 px-4 md:py-8 md:px-6"}>
                        <CardHeader>
                            <CardTitle className={"text-xl lg:text-2xl text-heading-color font-bold"}>
                                User Registration Trend
                            </CardTitle>
                            <CardDescription className={"text-gray-dark text-base mb-8"}>
                                Monthly user registration statistics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={registrationData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="registrations"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Empty State */}
            {totalUsers === 0 && totalPets === 0 && totalCampaigns === 0 && totalDonations === 0 && (
                <Card className="text-center py-12">
                    <CardContent>
                        <DatabaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-heading-color mb-2">No Data Available</h3>
                        <p className="text-pg-base mb-4">
                            Platform statistics will appear here as users, pets, and donations are added to the system.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AdminStatistics;
