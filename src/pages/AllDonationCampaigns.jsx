import CardContainer from "@/components/card/CardContainer";
import EmptyState from "@/components/EmptyState";
import Navbar from "@/components/navbar/Navbar";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import PetListingSkeleton from "@/components/loader/Skeletons/PetListingSkeleton";
import Loader from "@/components/loader/Loader";
import { useInView } from "react-intersection-observer";
import DonationCampCards from "@/components/card/DonationCampCards";

const AllDonationCampaigns = () => {
    const { ref, inView } = useInView();

    //Get Pet data using Tanstack Query and Axios GET Method
    const {
        data: allDonationData,
        status,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["allDonations"],
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams();
            params.append("cursor", pageParam);
            params.append("limit", 6);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/donation-campaigns?${params.toString()}`);
            return res.data;
        },
        initialPageParam: 0,
        getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
        getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });

    // Prevent scrolling when loading
    useEffect(() => {
        if (status === "pending") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [status]);

    // Flatten all pets from all pages
    const allDonations = allDonationData ? allDonationData.pages.flatMap((page) => page.donations) : [];

    // Filtered and sorted pets
    const sortedCampaigns = allDonations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Intersection observer effect
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="bg-background-primary flex flex-col min-h-screen">
            <Navbar />
            <div>
                <div className="text-center space-y-6 max-w-11/12 px-4 2xl:max-w-9/12 bg-background-head-text mx-auto rounded-3xl py-6 mt-12 md:py-8">
                    <h1 className="text-4xl text-heading-color">Donate to a Pet in need, Be a SuperHero!</h1>
                    <p className="text-pg-base">
                        Not all heroes wear capes, but donators donating to the cause of saving animals wear capes. So,
                        donate from the below donation list to gift a pet a better life.
                    </p>
                </div>
            </div>

            <div className="mx-auto py-12 max-w-11/12 md:max-w-11/12 lg:max-w-11/12 xl:max-w-9/12 flex-1">
                {status === "pending" ? (
                    <CardContainer>
                        <PetListingSkeleton />
                    </CardContainer>
                ) : status === "error" ? (
                    <EmptyState />
                ) : sortedCampaigns && sortedCampaigns.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <CardContainer>
                            {sortedCampaigns.map((dons) => (
                                <DonationCampCards key={dons._id} donations={dons} />
                            ))}
                        </CardContainer>
                        {/* Intersection Observer trigger for infinite scroll */}
                        {hasNextPage && (
                            <div className="w-full flex justify-center py-8">
                                {isFetchingNextPage ? (
                                    <Loader height={40} width={6} color="#2563eb" />
                                ) : (
                                    <div ref={ref} className="h-4 w-full" />
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <EmptyState />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllDonationCampaigns;
