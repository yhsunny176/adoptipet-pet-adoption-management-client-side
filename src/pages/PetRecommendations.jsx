import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PreferencesModal from "@/components/modal/PreferencesModal";
import PetCard from "@/components/card/PetCard";
import PageLoader from "@/components/loader/PageLoader";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings, Heart } from "lucide-react";
import { toast } from "react-toastify";
import { bangladeshDistricts } from "@/utils/districts";
import { petCategoryOptions } from "@/utils/pet_categories";

const PetRecommendations = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [showPreferencesModal, setShowPreferencesModal] = useState(false);
    const [preferences, setPreferences] = useState(null);
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    // Check for existing preferences on component mount
    useEffect(() => {
        const savedPreferences = localStorage.getItem("petMatchPreferences");
        if (savedPreferences) {
            setPreferences(JSON.parse(savedPreferences));
        } else {
            setIsFirstVisit(true);
            setShowPreferencesModal(true);
        }
    }, []);

    // Fetch recommendations based on preferences
    const {
        data: recommendations = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["petRecommendations", preferences],
        queryFn: async () => {
            if (!preferences) return [];

            const params = new URLSearchParams();
            preferences.categories.forEach((cat) => params.append("categories", cat));
            params.append("district", preferences.district);
            params.append("limit", "12");

            const response = await axiosSecure.get(`/pet-recommendations?${params.toString()}`);
            return response.data;
        },
        enabled: !!preferences && !!user,
        retry: 1,
        onError: (error) => {
            console.error("Error fetching recommendations:", error);
            // If the endpoint doesn't exist yet, fall back to regular pet listing
            if (error.response?.status === 404) {
                return fetchFallbackPets();
            }
        },
    });

    // Fallback function to fetch regular pets if recommendations endpoint doesn't exist
    const fetchFallbackPets = async () => {
        try {
            const params = new URLSearchParams();
            if (preferences?.categories?.length > 0) {
                params.append("category", preferences.categories[0]);
            }
            params.append("limit", "12");

            const response = await axiosSecure.get(`/pets?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching fallback pets:", error);
            return [];
        }
    };

    const handleSavePreferences = (newPreferences) => {
        setPreferences(newPreferences);
        setIsFirstVisit(false);
        toast.success("Preferences saved successfully!");
        refetch();
    };

    const handleUpdatePreferences = () => {
        setShowPreferencesModal(true);
    };

    const getCategoryLabel = (value) => {
        const category = petCategoryOptions.find((cat) => cat.value === value);
        return category ? category.label : value;
    };

    const getDistrictLabel = (value) => {
        const district = bangladeshDistricts.find((dist) => dist.value === value);
        return district ? district.label : value;
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please log in to view recommendations</h2>
                    <Button onClick={() => navigate("/auth/login")} className="bg-base-rose hover:bg-base-rose-dark">
                        Go to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-primary">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 py-12">
                <div className="main-container">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-heading-color mb-3 flex items-center gap-3">
                                Your Pet Match Recommendations
                            </h1>
                            <p className="text-lg text-pg-base">
                                Personalized pet suggestions based on your preferences
                            </p>
                        </div>
                        <Button onClick={handleUpdatePreferences} variant="default" className="flex items-center gap-2 bg-base-rose text-base-white border-0">
                            <Settings className="w-5 h-5" />
                            Update Preferences
                        </Button>
                    </div>

                    {/* Display Current Preferences */}
                    {preferences && (
                        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            <h3 className="font-semibold mb-3 flex items-center gap-2 text-pg-base">
                                <Heart className="w-5 h-5 text-base-rose" />
                                Your Current Preferences
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div>
                                    <span className="text-base-rose text-lg">Categories: </span>
                                    <span className="font-medium text-pg-base text-lg">
                                        {preferences.categories.map((cat) => getCategoryLabel(cat)).join(", ")}
                                    </span>
                                </div>
                                <Separator orientation="vertical" className="h-5 text-pg-base" />
                                <div>
                                    <span className="text-base-rose font-medium text-lg">Location: </span>
                                    <span className="font-medium text-pg-base text-lg">
                                        {getDistrictLabel(preferences.district)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="main-container py-12">
                {isLoading ? (
                    <PageLoader />
                ) : recommendations.length === 0 ? (
                    <EmptyState
                        title="No pets found matching your preferences"
                        description="Try updating your preferences or check back later for new pets"
                        actionLabel="Update Preferences"
                        onAction={handleUpdatePreferences}
                    />
                ) : (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-heading-color">
                                Found {recommendations.length} pets matching your preferences
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {recommendations.map((pet) => (
                                <PetCard key={pet._id || pet.id} petData={pet} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Preferences Modal */}
            <PreferencesModal
                isOpen={showPreferencesModal}
                onClose={() => {
                    if (isFirstVisit && !preferences) {
                        // If it's first visit and user closes without saving, redirect to home
                        navigate("/");
                    } else {
                        setShowPreferencesModal(false);
                    }
                }}
                onSavePreferences={handleSavePreferences}
            />
        </div>
    );
};

export default PetRecommendations;
