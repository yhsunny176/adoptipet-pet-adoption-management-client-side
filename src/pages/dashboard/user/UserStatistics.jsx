import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    HeartIcon,
    PawPrintIcon,
    DollarSignIcon,
    TrendingUpIcon,
    UsersIcon,
    CalendarIcon,
    TargetIcon,
    ActivityIcon,
} from "lucide-react";
import AddedPetsSkeleton from "@/components/loader/Skeletons/AddedPetsSkeleton";

const UserStatistics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch user's pets data
    const { data: myPetsData = [], isLoading: petsLoading } = useQuery({
        queryKey: ["myPetsData", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/dashboard/my-added-pets/${user?.email}`);
            return data;
        },
    });

    // Fetch adoption requests data
    const { data: adoptReqData = [], isLoading: adoptReqLoading } = useQuery({
        queryKey: ["adoptReqData", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/dashboard/adoption-requests/${user?.email}`);
            return data;
        },
    });

    // Fetch donation campaigns data
    const { data: myDonationCampaigns = [], isLoading: campaignLoading } = useQuery({
        queryKey: ["myDonInfo", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/dashboard/my-campaign-data/${user?.email}`);
            return data;
        },
    });

    // Fetch my donations data
    const { data: myDonations = [], isLoading: donationsLoading } = useQuery({
        queryKey: ["myDons", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/dashboard/my-donations/${user?.email}`);
            return data;
        },
    });

    if (petsLoading || adoptReqLoading || campaignLoading || donationsLoading) {
        return <AddedPetsSkeleton />;
    }

    // Calculate statistics
    const totalPets = myPetsData.length;
    const adoptedPets = myPetsData.filter((pet) => pet.adopted).length;
    const notAdoptedPets = totalPets - adoptedPets;

    const totalAdoptionRequests = adoptReqData.length;
    const acceptedRequests = adoptReqData.filter((req) => req.adoption_status === "accepted").length;
    const rejectedRequests = adoptReqData.filter((req) => req.adoption_status === "rejected").length;
    const pendingRequests = totalAdoptionRequests - acceptedRequests - rejectedRequests;

    const totalCampaigns = myDonationCampaigns.length;
    const activeCampaigns = myDonationCampaigns.filter((campaign) => !campaign.paused).length;

    const totalDonationsMade = myDonations.length;
    const totalAmountDonated = myDonations.reduce((sum, donation) => sum + (Number(donation.amount_donated) || 0), 0);
    const totalAmountRaised = myDonationCampaigns.reduce(
        (sum, campaign) => sum + (Number(campaign.total_donations) || 0),
        0
    );

    // Prepare chart data
    const petStatusData = [
        { name: "Adopted", value: adoptedPets, color: "#22c55e" },
        { name: "Available", value: notAdoptedPets, color: "#f59e0b" },
    ];

    const adoptionRequestsData = [
        { name: "Accepted", value: acceptedRequests, color: "#22c55e" },
        { name: "Pending", value: pendingRequests, color: "#f59e0b" },
        { name: "Rejected", value: rejectedRequests, color: "#ef4444" },
    ];

    // Pet categories data
    const categoryData = myPetsData.reduce((acc, pet) => {
        const category = pet.category || "Other";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const petCategoryData = Object.entries(categoryData).map(([category, count]) => ({
        category,
        count,
    }));

    // Donation progress data
    const donationProgressData = myDonationCampaigns.map((campaign) => ({
        name: campaign.pet_name,
        target: Number(campaign.max_amount) || 0,
        raised: Number(campaign.total_donations) || 0,
        progress: Math.min(100, ((Number(campaign.total_donations) || 0) / (Number(campaign.max_amount) || 1)) * 100),
    }));

    // Debug: Log the data to see what's available
    console.log("myDonationCampaigns:", myDonationCampaigns);
    console.log("donationProgressData:", donationProgressData);

    const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#f97316"];

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-heading-color mb-2">Dashboard Statistics</h1>
                <p className="text-pg-base">Overview of your pet adoption and donation activities</p>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Total Pets Added</CardTitle>
                        <PawPrintIcon className="h-8 w-8" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalPets}</div>
                        <p className="text-sm mt-3">
                            {adoptedPets} adopted, {notAdoptedPets} available
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4  rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Adoption Requests</CardTitle>
                        <HeartIcon className="h-8 w-8" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAdoptionRequests}</div>
                        <p className="text-sm mt-3">
                            {acceptedRequests} accepted, {pendingRequests} pending
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
                            {activeCampaigns} active, ${totalAmountRaised} raised
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">My Donations</CardTitle>
                        <DollarSignIcon className="h-8 w-8" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalDonationsMade}</div>
                        <p className="text-sm mt-3">${totalAmountDonated} total donated</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pet Status Pie Chart */}
                <Card className="px-3 py-4 md:px-6 md:py-8">
                    <CardHeader>
                        <CardTitle className="text-xl lg:text-2xl text-heading-color font-bold">
                            Pet Adoption Status
                        </CardTitle>
                        <CardDescription className={"text-gray-dark text-base"}>
                            Distribution of adopted vs available pets
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
                                <h3 className="text-lg font-semibold text-gray-500 mb-2">No Pets Added Yet</h3>
                                <p className="text-sm text-gray-400">Add some pets to see adoption statistics</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Adoption Requests Status */}
                <Card className="px-3 py-4 md:px-6 md:py-8">
                    <CardHeader>
                        <CardTitle className="text-xl lg:text-2xl text-heading-color font-bold">
                            Adoption Requests Status
                        </CardTitle>
                        <CardDescription className={"text-gray-dark text-base"}>
                            Status breakdown of adoption requests
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {totalAdoptionRequests > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={adoptionRequestsData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value">
                                        {adoptionRequestsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[300px] text-center">
                                <HeartIcon className="h-16 w-16 text-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-500 mb-2">No Adoption Requests</h3>
                                <p className="text-sm text-gray-400">
                                    Adoption requests will appear here when received
                                </p>
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
                                Distribution of pets across different categories
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
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUpIcon className="h-5 w-5 text-green-500" />
                                    Success Rate
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-green-600 mb-3">
                                    {totalPets > 0 ? Math.round((adoptedPets / totalPets) * 100) : 0}%
                                </div>
                                <p className="text-sm text-pg-base">Pet adoption success rate</p>
                            </CardContent>
                        </Card>

                        <Card className={" py-4 rounded-xl"}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
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
                                <CardTitle className="flex items-center gap-2">
                                    <UsersIcon className="h-5 w-5 text-purple-500" />
                                    Community Impact
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-purple-600 mb-3">
                                    {adoptedPets + totalDonationsMade}
                                </div>
                                <p className="text-sm text-pg-base">Total positive actions taken</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Donation Campaign Progress */}
                {donationProgressData.length > 0 && (
                    <Card className={"col-span-1 lg:col-span-2 py-4 px-4 md:py-8 md:px-6"}>
                        <CardHeader>
                            <CardTitle className={"text-xl lg:text-2xl text-heading-color font-bold"}>
                                Donation Campaign Progress
                            </CardTitle>
                            <CardDescription className={"text-gray-dark text-base mb-8"}>
                                Progress towards donation goals
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={donationProgressData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, name) => {
                                            if (name === "raised") return [`$${value}`, "Amount Raised"];
                                            if (name === "target") return [`$${value}`, "Target Amount"];
                                            return [value, name];
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="raised" fill="#22c55e" name="Raised" />
                                    <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Empty State */}
            {totalPets === 0 && totalAdoptionRequests === 0 && totalCampaigns === 0 && totalDonationsMade === 0 && (
                <Card className="text-center py-12">
                    <CardContent>
                        <PawPrintIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-heading-color mb-2">No Data Available</h3>
                        <p className="text-pg-base mb-4">
                            Start by adding pets, creating donation campaigns, or making donations to see your
                            statistics.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default UserStatistics;
