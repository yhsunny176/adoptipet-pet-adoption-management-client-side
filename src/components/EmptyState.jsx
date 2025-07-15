import Lottie from "lottie-react";
import React from "react";
import noDataAnimation from "@/assets/animation/no-data-found.json";
const EmptyState = () => {
    return (
        <div className="max-w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6">
                <div className="w-80 h-full">
                    <Lottie animationData={noDataAnimation}/>
                </div>
                <h1 className="text-4xl text-navitem-base">Sorry! No Data Available</h1>
            </div>
        </div>
    );
};

export default EmptyState;
