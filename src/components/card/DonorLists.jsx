import React from "react";
import Skeleton from "react-loading-skeleton";
import EmptyState from "../EmptyState";

const DonorLists = ({ donors = [], isLoading, isError, error }) => {
    if (isLoading) {
        return <Skeleton width={"100%"} height={80} />;
    }
    if (isError) {
        return (
            <div className="flex items-center justify-center text-base-rose-dark bg-base-rose-light">
                {error?.message || "Failed to fetch donors"}
            </div>
        );
    }
    if (!donors || donors.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <EmptyState />
            </div>
        );
    }

    return (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {donors.map((donor, idx) => (
                <div
                    key={donor._id || idx}
                    className="flex items-center gap-4 py-3 px-4 border border-card-border-prim rounded-lg shadow">
                    <img
                        src={donor.profilepic || null}
                        alt={donor.user_name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-3 py">
                        <span className="font-semibold text-base">{donor.user_name}</span>
                        <span className="text-sm text-gray-medium">{donor.email}</span>
                        <span className="text-green-primary font-bold">Donated: ${donor.amount_donated}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DonorLists;
