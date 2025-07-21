import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import EmptyState from "@/components/EmptyState";
import CardContainer from "@/components/card/CardContainer";
import PetCard from "@/components/card/PetCard";
import PetListingSkeleton from "@/components/loader/Skeletons/PetListingSkeleton";
import Navbar from "@/components/navbar/Navbar";
import Loader from "@/components/loader/Loader";

const CategoryPetsPage = () => {
    const { category } = useParams();
    const { ref, inView } = useInView();

    const { data, status, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["category-pets", category],
        queryFn: async ({ pageParam = 0 }) => {
            const params = new URLSearchParams();
            params.append("cursor", pageParam);
            params.append("limit", 6);
            params.append("category", category);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/category-pets?${params.toString()}`);
            return res.data;
        },
        initialPageParam: 0,
        getPreviousPageParam: (firstPage) => firstPage?.previousId ?? undefined,
        getNextPageParam: (lastPage) => lastPage?.nextId ?? undefined,
        retry: 1,
        onError: (err) => {
            toast.error(err?.response?.data?.message || err.message || "Failed to fetch pets");
        },
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allPets = data ? data.pages.flatMap((page) => page.pets) : [];
    const noCategoryData = data && allPets.length === 0 && !isFetching && !isFetchingNextPage;

    return (
        <div className="bg-background-primary flex flex-col min-h-screen">
            <div>
                <div className="text-center space-y-6 max-w-11/12 px-4 2xl:max-w-9/12 bg-background-head-text mx-auto rounded-3xl py-6 mt-12 md:py-8">
                    <h2 className="text-4xl text-heading-color capitalize">Open Your Heart to a {category}</h2>
                    <p className="text-pg-base">
                        Every {category.toLowerCase()} deserves a loving family. Give hope, share love, and start a new
                        chapter with a loyal friend waiting just for you.
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
                ) : noCategoryData ? (
                    <div className="flex items-center justify-center">
                        <EmptyState />
                    </div>
                ) : allPets && allPets.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <CardContainer>
                            {allPets.map((petData) => (
                                <PetCard key={petData._id} petData={petData} />
                            ))}
                        </CardContainer>
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

export default CategoryPetsPage;
