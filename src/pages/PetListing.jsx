import CardContainer from "@/components/card/CardContainer";
import PetCard from "@/components/card/PetCard";
import EmptyState from "@/components/EmptyState";
import Navbar from "@/components/navbar/Navbar";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PetListingSkeleton from "@/components/loader/Skeletons/PetListingSkeleton";
import Loader from "@/components/loader/Loader";
import SearchBar from "@/components/SearchBar";
import CategorySelect from "@/components/CategorySelect";
import { petCategoryOptions } from "@/utils/pet_categories";
import { useInView } from "react-intersection-observer";

const PetListing = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { ref, inView } = useInView();

    //Get Pet data using Tanstack Query and Axios GET Method
    const {
        data: allPetsData,
        status,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["all pets", search, selectedCategory],
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams();
            params.append("cursor", pageParam);
            params.append("limit", 6);
            if (search) params.append("search", search);
            if (selectedCategory && selectedCategory.value) params.append("category", selectedCategory.value);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-pets?${params.toString()}`);
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
    const allPets = allPetsData ? allPetsData.pages.flatMap((page) => page.pets) : [];

    // Filtered and sorted pets
    const filteredPets = allPets
        .filter((pet) => {
            // Only show pets that are not adopted
            if (pet.adopted) return false;
            const searchDataMatch = pet.pet_name.toLowerCase().includes(search.toLowerCase());
            if (!selectedCategory) {
                return searchDataMatch;
            }
            // Normalize: lowercase, remove spaces/underscores
            const normalize = (str) => str?.toString().toLowerCase().replace(/\s|_/g, "").trim();
            const petCategoryNorm = normalize(pet.category);
            const selectedCategoryNorm = normalize(selectedCategory.value);

            // Allow plural/singular match
            const pluralize = (str) => (str.endsWith("s") ? str : str + "s");
            const singularize = (str) => (str.endsWith("s") ? str.slice(0, -1) : str);
            const categoryDataMatch =
                petCategoryNorm === selectedCategoryNorm ||
                pluralize(petCategoryNorm) === selectedCategoryNorm ||
                petCategoryNorm === pluralize(selectedCategoryNorm) ||
                singularize(petCategoryNorm) === selectedCategoryNorm ||
                petCategoryNorm === singularize(selectedCategoryNorm);
            return searchDataMatch && categoryDataMatch;
        })
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Intersection observer effect
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // If there is no pet data, show EmptyState
    const noCategoryData = allPetsData && filteredPets.length === 0 && !isFetching && !isFetchingNextPage;

    return (
        <div className="bg-background-primary flex flex-col min-h-screen">
            <Navbar />
            <div>
                <div className="text-center space-y-6 max-w-11/12 px-4 2xl:max-w-9/12 bg-background-head-text mx-auto rounded-3xl py-6 mt-12 md:py-8">
                    <h1 className="text-4xl text-heading-color">Adopt a Pet from our Pet Listing</h1>
                    <p className="text-pg-base">
                        Discover pets in need of a loving home, ready to become part of your family. Each listing is a
                        step closer to giving them a brighter future.
                    </p>
                </div>
            </div>

            {/* Search and Category Filter */}
            <div className="w-full max-w-11/12 xl:max-w-9/12 mx-auto mt-10 mb-6 px-2">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-3/6">
                        <SearchBar
                            className="w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search pets by name.."
                        />
                    </div>
                    <div className="w-3/6">
                        <CategorySelect
                            value={selectedCategory}
                            onChange={(option) => setSelectedCategory(option)}
                            options={petCategoryOptions}
                            isClearable={true}
                        />
                    </div>
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
                ) : filteredPets && filteredPets.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <CardContainer>
                            {filteredPets.map((petData) => (
                                <PetCard key={petData._id} petData={petData} />
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

export default PetListing;
