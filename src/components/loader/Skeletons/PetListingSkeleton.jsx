import React from "react";
import Skeleton from "react-loading-skeleton";

const PetListingSkeleton = () => {
    // 6 skeleton cards to match the loading state
    return (
        <>
            {[...Array(6)].map((_, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-card-primary p-0 overflow-hidden flex flex-col items-center w-[320px] min-h-[380px] border border-gray-200">
                    {/* Image skeleton */}
                    <div className="w-full h-[200px] flex items-center justify-center bg-gray-100">
                        <Skeleton
                            height={200}
                            width={260}
                            style={{ borderRadius: 0 }}
                            baseColor="#e0e7ef"
                            highlightColor="#f5f7fa"
                        />
                    </div>
                    {/* Card content skeletons */}
                    <div className="flex-1 w-full px-4 py-4 flex flex-col gap-2">
                        <Skeleton height={24} width={180} baseColor="#e0e7ef" highlightColor="#f5f7fa" />

                        <Skeleton height={18} width={120} baseColor="#e0e7ef" highlightColor="#f5f7fa" />

                        <div className="mt-4">
                            <Skeleton
                                height={36}
                                width={120}
                                borderRadius={8}
                                baseColor="#e0e7ef"
                                highlightColor="#f5f7fa"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PetListingSkeleton;
