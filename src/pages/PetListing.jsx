import CardContainer from "@/components/card/CardContainer";
import PetCard from "@/components/card/PetCard";
import EmptyState from "@/components/EmptyState";
import Navbar from "@/components/navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import SearchBar from "@/components/SearchBar";
import CategorySelect from "@/components/CategorySelect";
import { petCategoryOptions } from "@/utils/pet_categories";

const PetListing = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    //Get Pet data using Tanstack Query and Axios GET Method
    const { data: allPetsData, isLoading } = useQuery({
        queryKey: ["all pets"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-pets`);
            return res.data;
        },
    });

    // If there is no pet data, show EmptyState
    const noCategoryData = allPetsData && allPetsData.length === 0;

    // Filtered and sorted pets
    let filteredPets = [];
    if (allPetsData) {
        filteredPets = [...allPetsData]
            .filter((pet) => {
                const searchDataMatch = pet.pet_name.toLowerCase().includes(search.toLowerCase());
                if (!selectedCategory) {
                    return searchDataMatch;
                }
                const normalize = (str) => str?.toString().toLowerCase().replace(/\s|_/g, "");
                const categoryDataMatch = normalize(pet.category) === normalize(selectedCategory.value);
                return searchDataMatch && categoryDataMatch;
            })
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return (
        <div className="bg-background-primary flex flex-col min-h-screen">
            <Navbar />
            <div>
                <div className="text-center space-y-6 max-w-9/12 bg-background-head-text mx-auto rounded-3xl py-6 mt-12 md:py-8">
                    <h1 className="text-4xl text-heading-color">Adopt a Pet from our Pet Listing</h1>
                    <p className="text-pg-base">
                        Discover pets in need of a loving home, ready to become part of your family. Each listing is a
                        step closer to giving them a brighter future.
                    </p>
                </div>
            </div>

            {/* Search and Category Filter */}
            <div className="w-full max-w-9/12 mx-auto mt-10 mb-6 px-2">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-4/5">
                        <SearchBar
                            className="w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search pets by name.."
                        />
                    </div>
                    <div className="w-1/5">
                        <CategorySelect
                            value={selectedCategory}
                            onChange={(option) => setSelectedCategory(option)}
                            options={petCategoryOptions}
                            isClearable={true}
                        />
                    </div>
                </div>
            </div>
            <div className="mx-auto py-12 xl:max-w-9/12 flex-1 flex items-center justify-center">
                {isLoading ? (
                    <CardContainer>
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="p-4">
                                <Skeleton
                                    height={320}
                                    width={260}
                                    style={{ borderRadius: 16 }}
                                    baseColor="#e0e7ef"
                                    highlightColor="#f5f7fa"
                                />
                                <div className="mt-4">
                                    <Skeleton height={24} width={180} baseColor="#e0e7ef" highlightColor="#f5f7fa" />
                                </div>
                                <div className="mt-2">
                                    <Skeleton height={18} width={120} baseColor="#e0e7ef" highlightColor="#f5f7fa" />
                                </div>
                            </div>
                        ))}
                    </CardContainer>
                ) : noCategoryData ? (
                    <EmptyState />
                ) : filteredPets && filteredPets.length > 0 ? (
                    <CardContainer>
                        {filteredPets.map((petData) => (
                            <PetCard key={petData._id} petData={petData} />
                        ))}
                    </CardContainer>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
};

export default PetListing;
