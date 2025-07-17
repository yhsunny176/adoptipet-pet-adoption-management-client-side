import React from "react";
import Skeleton from "react-loading-skeleton";

const UpdatePetSkeleton = () => {
    return (
        <div className="bg-background-tertiary w-full">
            <div className="w-full max-w-11/12 xl:max-w-8/12 mx-auto bg-background-tertiary backdrop-blur-sm rounded-2xl p-8 border border-gray-border shadow-card-primary">
                <div className="pet-add-form space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Photo Upload or Preview */}
                        <div className="flex items-center justify-center bg-background-primary rounded-xl h-[300px] w-full">
                            <Skeleton className="w-full h-full rounded-xl" />
                        </div>
                        {/* Basic Pet Info */}
                        <div className="space-y-6">
                            {/* Pet Name */}
                            <div className="w-full">
                                <Skeleton className="w-full h-[56px] rounded-lg" />
                            </div>
                            {/* Pet Age */}
                            <div className="w-full">
                                <Skeleton className="w-full h-[56px] rounded-lg" />
                            </div>
                        </div>
                        {/* Pet Location */}
                        <div className="w-full">
                            <Skeleton className="w-full h-[56px] rounded-lg" />
                        </div>
                        {/* Pet Category */}
                        <div className="w-full">
                            <Skeleton className="w-full h-[56px] rounded-lg" />
                        </div>
                    </div>
                    {/* Short Description */}
                    <div className="w-full mt-6">
                        <Skeleton className="w-full h-[120px] rounded-lg" />
                    </div>
                    {/* Long Description */}
                    <div className="w-full mt-6">
                        <Skeleton className="w-full h-[220px] rounded-lg" />
                    </div>
                    <div className="pt-4 flex gap-4 justify-end">
                        {/* Update button Skeleton*/}
                        <Skeleton className="w-[120px] h-[48px] rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePetSkeleton;
