import React from "react";

const DonDetailsSkeleton = () => (
    <div className="flex flex-col min-h-screen bg-background-primary animate-pulse">
        {/* Navbar Skeleton */}
        <div className="h-16 w-full bg-background-quaternary mb-8" />

        {/* Title & Description Skeleton */}
        <div className="space-y-4 w-full max-w-11/12 mx-auto pt-8 pb-2 px-2 flex flex-col items-center text-center xl:text-left xl:flex-col xl:items-start sm:px-4 md:px-8">
            <div className="h-8 w-2/3 bg-background-quaternary rounded mb-2" />
            <div className="h-4 w-1/2 bg-background-quaternary rounded" />
        </div>

        <div className="w-full max-w-11/12 mx-auto flex flex-1 py-6 px-2 sm:px-4 md:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-8 gap-6 xl:gap-16 w-full">
                {/* Image Skeleton */}
                <div className="w-full h-96 xl:h-full xl:col-span-3 rounded-2xl border border-base-rose flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-background-quaternary rounded-2xl" />
                </div>

                {/* Right side contents Skeleton */}
                <div className="xl:col-span-5 flex flex-col gap-6">
                    {/* Basic Info Skeleton */}
                    <div className="flex flex-wrap items-center justify-between gap-2 max-w-full sm:gap-6 md:gap-12 px-6 sm:px-4 md:px-8 xl:flex-row xl:max-w-max rounded-xl py-4 border border-gray-light w-full overflow-x-auto">
                        <div className="flex gap-3 xl:flex-col items-center mx-auto xl:mx-0 lg:gap-1">
                            <div className="h-6 w-24 bg-background-quaternary rounded mb-3" />
                            <div className="h-8 w-32 bg-background-quaternary rounded mt-1" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-8 xl:gap-12">
                        {/* Maximum Donation Amount Skeleton */}
                        <div>
                            <div className="flex flex-col gap-2 bg-background-quaternary rounded-xl">
                                <div className="h-5 w-40 bg-background-tertiary rounded mt-1" />
                                <div className="h-8 w-24 bg-background-tertiary rounded mt-1" />
                            </div>
                        </div>
                        <div className="border-r-2 border-r-gray-light h-24" />
                        {/* Last Donation Date Skeleton */}
                        <div>
                            <div className="flex flex-col gap-2 bg-background-quaternary py-4 sm:py-6 sm:px-6 rounded-xl">
                                <div className="h-5 w-36 bg-background-tertiary rounded mt-1" />
                                <div className="h-8 w-20 bg-background-tertiary rounded mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Short Description Skeleton */}
                    <div>
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <div className="h-6 w-56 bg-background-quaternary rounded mt-1" />
                            <div className="h-4 w-64 bg-background-quaternary rounded mt-1" />
                        </div>
                    </div>
                </div>

                {/* Horizontal Line Skeleton */}
                <div className="col-span-full border-t-1 my-4 border-t-base-rose" />

                {/* Full description Skeleton */}
                <div className="col-span-full auto-rows-auto space-y-4 md:space-y-8">
                    <div className="h-6 w-72 bg-background-quaternary rounded mt-1 mb-2" />
                    <div className="space-y-2 md:space-y-4">
                        <div className="h-4 w-full bg-background-quaternary rounded mb-2" />
                        <div className="h-4 w-5/6 bg-background-quaternary rounded mb-2" />
                        <div className="h-4 w-3/4 bg-background-quaternary rounded mb-2" />
                    </div>
                </div>

                {/* horizontal line Skeleton */}
                <div className="col-span-full border-t-1 my-4 border-t-base-rose" />

                {/* Added by Skeleton */}
                <div className="col-span-full">
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-4 sm:space-y-0">
                        <div className="h-4 w-24 bg-background-quaternary rounded" />
                        <div className="flex flex-row items-center space-x-3">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-background-tertiary rounded-full" />
                            <div className="h-6 w-32 bg-background-quaternary rounded" />
                        </div>
                    </div>
                </div>

                {/* Adopt button Skeleton */}
                <div className="col-span-full flex flex-col items-stretch">
                    <div className="h-14 w-full bg-base-rose/30 rounded mb-4" />
                </div>

                {/* Recommended Donation Campaigns Section Skeleton */}
                <div className="col-span-full mt-8">
                    <div className="h-6 w-80 bg-background-quaternary rounded mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(3)].map((_, idx) => (
                            <div
                                key={idx}
                                className="border border-card-border-prim rounded-lg p-4 bg-background-quaternary shadow-card-primary flex flex-col items-center transition-transform">
                                <div className="w-full h-32 bg-background-tertiary rounded-lg mb-3" />
                                <div className="w-full">
                                    <div className="h-5 w-24 bg-background-quaternary rounded mb-1" />
                                    <div className="h-4 w-32 bg-background-quaternary rounded mb-2" />
                                </div>
                                <div className="h-10 w-full bg-base-rose/30 rounded mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default DonDetailsSkeleton;
