import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    UserIcon,
    MailIcon,
    CalendarIcon,
    ShieldCheckIcon,
    ClockIcon,
    EditIcon,
    CameraIcon,
    SaveIcon,
    XIcon,
} from "lucide-react";
import AddedPetsSkeleton from "@/components/loader/Skeletons/AddedPetsSkeleton";
import { toast } from "react-toastify";

const UserProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: "",
        profilepic: "",
    });

    // Fetch user profile data
    const { data: userProfile, isLoading } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure(`/user/profile/${user?.email}`);
                return data.user;
            } catch (error) {
                console.error("Profile fetch error:", error);
                // If the profile endpoint fails, return user data from auth context
                return {
                    email: user?.email,
                    name: user?.displayName,
                    profilepic: user?.photoURL,
                    role: "user",
                    created_at: null,
                    last_loggedIn: new Date().toISOString(),
                };
            }
        },
        enabled: !!user?.email,
    });

    // Update profile mutation
    const updateProfileMutation = useMutation({
        mutationFn: async (updateData) => {
            const { data } = await axiosSecure.patch(`/user/profile/${user?.email}`, updateData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userProfile", user?.email]);
            setIsEditModalOpen(false);
            toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update profile");
        },
    });

    const handleEditClick = () => {
        setEditFormData({
            name: displayName || "",
            profilepic: profileImage || "",
        });
        setIsEditModalOpen(true);
    };

    const handleSaveProfile = () => {
        if (!editFormData.name.trim()) {
            toast.error("Name is required");
            return;
        }
        updateProfileMutation.mutate(editFormData);
    };

    const handleInputChange = (field, value) => {
        setEditFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    if (isLoading) {
        return <AddedPetsSkeleton />;
    }

    const formatDate = (dateString) => {
        if (!dateString) return "Not available";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    // Use the correct field names from database
    const displayName = userProfile?.name || user?.displayName;
    const profileImage = userProfile?.profilepic || user?.photoURL;
    const userEmail = userProfile?.email || user?.email;
    const userRole = userProfile?.role || "user";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-heading-color mb-2">My Profile</h1>
                <p className="text-pg-base">Manage your account information and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="lg:col-span-1 py-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="text-center">
                        <div className="relative inline-block mb-6">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt={displayName || "Profile"}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                                    {getInitials(displayName)}
                                </div>
                            )}
                            <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
                                <CameraIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold text-heading-color mb-2">{displayName || "User"}</h2>
                        <p className="text-pg-base mb-4">{userEmail}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                            <ShieldCheckIcon className="h-4 w-4" />
                            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Information */}
                <Card className="lg:col-span-2 py-6">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col gap-6 lg:items-center lg:justify-between lg:flex-row">
                            <div>
                                <CardTitle className="text-2xl text-heading-color font-bold">
                                    Profile Information
                                </CardTitle>
                                <CardDescription className="text-gray-dark text-base mt-2">
                                    Your account details and information
                                </CardDescription>
                            </div>
                            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={handleEditClick}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
                                        <EditIcon className="h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-10/12 sm:max-w-md bg-background-quaternary rounded-2xl border-card-border-prim">
                                    <DialogHeader>
                                        <DialogTitle className="text-heading-color">Edit Profile</DialogTitle>
                                        <DialogDescription className="text-pg-base">
                                            Update your profile information here.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold !text-heading-color">
                                                Display Name
                                            </label>
                                            <Input
                                                value={editFormData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                placeholder="Enter your name"
                                                className="w-full text-pg-base border-white mt-4"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold !text-heading-color">
                                                Profile Image URL
                                            </label>
                                            <Input
                                                value={editFormData.profilepic}
                                                onChange={(e) => handleInputChange("profilepic", e.target.value)}
                                                placeholder="Enter image URL"
                                                className="w-full text-pg-base border-white mt-4"
                                            />
                                        </div>
                                        {editFormData.profilepic && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold !text-heading-color">
                                                    Preview
                                                </label>
                                                <img
                                                    src={editFormData.profilepic}
                                                    alt="Preview"
                                                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-border mt-4"
                                                    onError={(e) => {
                                                        e.target.style.display = "none";
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditModalOpen(false)}
                                            disabled={updateProfileMutation.isPending}
                                            className={"bg-base-rose-dark text-white border-none"}>
                                            <XIcon className="h-4 w-4 text-white" />
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleSaveProfile}
                                            disabled={updateProfileMutation.isPending}
                                            className="bg-blue-500 hover:bg-blue-600 text-white">
                                            <SaveIcon className="h-4 w-4" />
                                            {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6">
                            {/* Display Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold !text-heading-color">
                                    <UserIcon className="h-4 w-4 text-heading-color" />
                                    Display Name
                                </label>
                                <div className="p-3 bg-background-secondary rounded-lg border border-gray-border">
                                    <p className="text-pg-base">{displayName || "Not provided"}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold !text-heading-color">
                                    <MailIcon className="h-4 w-4 text-heading-color" />
                                    Email Address
                                </label>
                                <div className="p-3 bg-background-secondary rounded-lg border border-gray-border">
                                    <p className="text-pg-base">{userEmail}</p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold !text-heading-color">
                                    <ShieldCheckIcon className="h-4 w-4 text-heading-color" />
                                    Account Role
                                </label>
                                <div className="p-3 bg-background-secondary rounded-lg border border-gray-border">
                                    <p className="text-pg-base capitalize">{userRole}</p>
                                </div>
                            </div>

                            {/* Account Created */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold !text-heading-color">
                                    <CalendarIcon className="h-4 w-4 text-heading-color" />
                                    Account Created
                                </label>
                                <div className="p-3 bg-background-secondary rounded-lg border border-gray-border">
                                    <p className="text-pg-base">{formatDate(userProfile?.created_at)}</p>
                                </div>
                            </div>

                            {/* Last Login */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold !text-heading-color">
                                    <ClockIcon className="h-4 w-4 text-heading-color" />
                                    Last Login
                                </label>
                                <div className="p-3 bg-background-secondary rounded-lg border border-gray-border">
                                    <p className="text-pg-base">{formatDate(userProfile?.last_loggedIn)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Account Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl">
                    <CardContent className="text-center">
                        <div className="text-3xl font-bold mb-2">{userRole === "admin" ? "∞" : "Active"}</div>
                        <p className="text-sm opacity-90">Account Status</p>
                    </CardContent>
                </Card>

                <Card className="py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl">
                    <CardContent className="text-center">
                        <div className="text-3xl font-bold mb-2">{userRole === "admin" ? "Admin" : "User"}</div>
                        <p className="text-sm opacity-90">User Type</p>
                    </CardContent>
                </Card>

                <Card className="py-4 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl">
                    <CardContent className="text-center">
                        <div className="text-3xl font-bold mb-2">
                            {userProfile?.created_at
                                ? Math.floor((new Date() - new Date(userProfile.created_at)) / (1000 * 60 * 60 * 24))
                                : 0}
                        </div>
                        <p className="text-sm opacity-90">Days Active</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserProfile;
