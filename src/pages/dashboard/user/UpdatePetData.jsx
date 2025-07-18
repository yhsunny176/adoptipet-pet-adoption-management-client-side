import EmptyState from "@/components/EmptyState";
import UpdatePetForm from "@/components/forms/UpdatePetForm";
import UpdatePetSkeleton from "@/components/loader/Skeletons/UpdatePetSkeleton";
import Navbar from "@/components/navbar/Navbar";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";

const UpdatePetData = () => {
    const { id } = useParams();

    const {
        data: petInfo,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["singlePet", id],
        queryFn: async () => {
            const { data } = await axiosSecure(`${import.meta.env.VITE_API_URL}/pet-detail/${id}`);
            return data;
        },
    });

    // Loading state: show animation if petInfo is not loaded
    if (!petInfo && isLoading) {
        return <UpdatePetSkeleton />;
    }

    if (!petInfo || typeof petInfo !== "object") {
        return (
            <div>
                <EmptyState />
            </div>
        );
    }

    return (
        <div className="bg-background-primary flex flex-col min-h-screen">
            <Navbar />
            <div>
                <div className="text-center space-y-3 max-w-11/12 px-4 2xl:max-w-8/12 bg-background-head-text mx-auto rounded-xl py-6 mt-12 md:py-4">
                    <h1 className="text-3xl text-heading-color">Update Your Pet Data</h1>
                    <p className="text-pg-base">
                        You can update your pet data from the form below. Edit the fields you want to update and submit.
                    </p>
                </div>

                {/* Update Pet Form */}
                <div className="max-w-11/12 xl:max-w-8/12 mx-auto py-16">
                    <UpdatePetForm petInfo={petInfo} refetch={refetch} />
                </div>
            </div>
        </div>
    );
};

export default UpdatePetData;
