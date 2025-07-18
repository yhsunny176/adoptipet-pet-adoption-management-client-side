import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DonDetailsSkeleton = () => (
    <div className="flex flex-col min-h-screen bg-background-primary">
        {/* Navbar Skeleton */}
        <Skeleton height={64} width="100%" className="mb-8" />

        {/* Title & Description Skeleton */}
        <div className="space-y-4 w-full max-w-11/12 mx-auto pt-8 pb-2 px-2 flex flex-col items-center text-center xl:text-left xl:flex-col xl:items-start sm:px-4 md:px-8">
            <Skeleton height={32} width="66%" className="mb-2" />
            <Skeleton height={16} width="50%" />
        </div>

        <div className="w-full max-w-11/12 mx-auto flex flex-1 py-6 px-2 sm:px-4 md:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-8 gap-6 xl:gap-16 w-full">
                {/* Image Skeleton */}
                <div className="w-full h-96 xl:h-full xl:col-span-3 rounded-2xl border border-base-rose flex items-center justify-center overflow-hidden">
                    <Skeleton height="100%" width="100%" className="rounded-2xl" />
                </div>

                {/* Right side contents Skeleton */}
                <div className="xl:col-span-5 flex flex-col gap-6">
                    {/* Basic Info Skeleton */}
                    <div className="flex flex-wrap items-center justify-between gap-2 max-w-full sm:gap-6 md:gap-12 px-6 sm:px-4 md:px-8 xl:flex-row xl:max-w-max rounded-xl py-4 border border-gray-light w-full overflow-x-auto">
                        <div className="flex gap-3 xl:flex-col items-center mx-auto xl:mx-0 lg:gap-1">
                            <Skeleton height={24} width={96} className="mb-3" />
                            <Skeleton height={32} width={128} className="mt-1" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-8 xl:gap-12">
                        {/* Maximum Donation Amount Skeleton */}
                        <div>
                            <div className="flex flex-col gap-2">
                                <Skeleton height={20} width={160} className="mt-1" />
                                <Skeleton height={32} width={96} className="mt-1" />
                            </div>
                        </div>
                        <div className="border-r-2 border-r-gray-light h-24" />
                        {/* Last Donation Date Skeleton */}
                        <div>
                            <div className="flex flex-col gap-2 py-4 sm:py-6 sm:px-6 rounded-xl">
                                <Skeleton height={20} width={144} className="mt-1" />
                                <Skeleton height={32} width={80} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Short Description Skeleton */}
                    <div>
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <Skeleton height={24} width={224} className="mt-1" />
                            <Skeleton height={16} width={256} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Horizontal Line Skeleton */}
                <div className="col-span-full border-t-1 my-4 border-t-base-rose" />

                {/* Full description Skeleton */}
                <div className="col-span-full auto-rows-auto space-y-4 md:space-y-8">
                    <Skeleton height={24} width={288} className="mt-1 mb-2" />
                    <div className="space-y-2 md:space-y-4">
                        <Skeleton height={16} width="100%" className="mb-2" />
                        <Skeleton height={16} width="83%" className="mb-2" />
                        <Skeleton height={16} width="75%" className="mb-2" />
                    </div>
                </div>

                {/* horizontal line Skeleton */}
                <div className="col-span-full border-t-1 my-4 border-t-base-rose" />

                {/* Added by Skeleton */}
                <div className="col-span-full">
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-4 sm:space-y-0">
                        <Skeleton height={16} width={96} />
                        <div className="flex flex-row items-center space-x-3">
                            <Skeleton circle height={56} width={56} className="sm:w-16 sm:h-16" />
                            <Skeleton height={24} width={128} />
                        </div>
                    </div>
                </div>

                {/* Adopt button Skeleton */}
                <div className="col-span-full flex flex-col items-stretch">
                    <Skeleton height={56} width="100%" className="mb-4" />
                </div>

                {/* Recommended Donation Campaigns Section Skeleton */}
                <div className="col-span-full mt-8">
                    <Skeleton height={24} width={320} className="mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(3)].map((_, idx) => (
                            <div
                                key={idx}
                                className="border border-card-border-prim rounded-lg p-4 bg-background-quaternary shadow-card-primary flex flex-col items-center transition-transform">
                                <Skeleton height={128} width="100%" className="mb-3 rounded-lg" />
                                <div className="w-full">
                                    <Skeleton height={20} width={96} className="mb-1" />
                                    <Skeleton height={16} width={128} className="mb-2" />
                                </div>
                                <Skeleton height={40} width="100%" className="mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default DonDetailsSkeleton;
