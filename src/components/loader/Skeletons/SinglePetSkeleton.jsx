import Navbar from "@/components/navbar/Navbar";
import React from "react";
import Skeleton from "react-loading-skeleton";

const SinglePetSkeleton = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background-primary">
            <Navbar />
            {/* Header section skeleton */}
            <div className="space-y-4 w-full max-w-11/12 mx-auto pt-8 pb-2 px-2 flex flex-col items-center text-center xl:text-left xl:flex-col xl:items-start sm:px-4 md:px-8">
                <Skeleton width={180} height={36} className="mb-2" />
                <Skeleton width={260} height={20} />
            </div>
            <div className="w-full max-w-11/12 mx-auto flex flex-1 py-6 px-2 sm:px-4 md:px-8">
                <div className="grid grid-cols-1 xl:grid-cols-8 gap-6 xl:gap-8 w-full">
                    {/* Image Skeleton */}
                    <div className="w-full h-96 xl:h-full xl:col-span-3 rounded-2xl flex items-center justify-center overflow-hidden">
                        <Skeleton width={540} height={360}/>
                    </div>

                    {/* Right side skeletons */}
                    <div className="xl:col-span-5 flex flex-col gap-6">
                        {/* Basic Info Skeleton */}
                        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 md:gap-16 px-6 sm:px-4 md:px-8 xl:max-w-max rounded-xl py-4 border border-gray-light w-full overflow-x-auto">
                            <div className="flex flex-col gap-1">
                                <Skeleton width={80} height={18} />
                                <Skeleton width={90} height={28} />
                            </div>
                            <div className="border-r border-r-gray-medium h-14"></div>
                            <div className="flex flex-col gap-1">
                                <Skeleton width={80} height={18} />
                                <Skeleton width={90} height={28} />
                            </div>
                            <div className="border-r border-r-gray-medium h-14"></div>
                            <div className="flex flex-col gap-1">
                                <Skeleton width={80} height={18} />
                                <Skeleton width={90} height={28} />
                            </div>
                        </div>

                        {/* Location Skeleton */}
                        <div>
                            <div className="flex flex-col gap-2 bg-background-quaternary py-4 px-4 sm:py-6 sm:px-6 rounded-xl">
                                <Skeleton width={100} height={20} />
                                <div className="flex items-center gap-2 sm:gap-3 rounded-2xl">
                                    <Skeleton circle width={24} height={24} />
                                    <Skeleton width={120} height={20} />
                                </div>
                            </div>
                        </div>

                        {/* Short Description Skeleton */}
                        <div>
                            <div className="flex flex-col gap-2 sm:gap-3 px-2 sm:px-6">
                                <Skeleton width={180} height={20} />
                                <Skeleton count={2} height={16} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Line Skeleton */}
                    <div className="col-span-full border-t-1 my-4 border-t-base-rose"></div>

                    {/* Full Description Skeleton */}
                    <div className="col-span-full auto-rows-auto space-y-4 md:space-y-8 px-2 sm:px-6">
                        <Skeleton width={220} height={28} />
                        <Skeleton count={4} height={16} className="mt-2" />
                    </div>

                    {/* horizontal line skeleton */}
                    <div className="col-span-full border-t-1 my-4 border-t-base-rose"></div>

                    {/* Added by skeleton */}
                    <div className="col-span-full">
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-4 sm:space-y-0">
                            <Skeleton width={100} height={18} />
                            <div className="flex flex-row items-center space-x-3">
                                <Skeleton circle width={56} height={56} className="sm:w-16 sm:h-16" />
                                <Skeleton width={120} height={24} />
                            </div>
                        </div>
                    </div>

                    {/* Adopt button skeleton */}
                    <div className="col-span-full flex flex-col items-stretch">
                        <Skeleton width={180} height={48} className="rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePetSkeleton;
