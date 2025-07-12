import React from "react";
import Lottie from "lottie-react";
import pageLoaderAnim from "@/assets/animation/page-loader-dog.json";

const PageLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-yellow-bg z-50">
            <div className="w-40 h-40 flex items-center justify-center">
                <Lottie animationData={pageLoaderAnim} loop={true} />
            </div>
        </div>
    );
};

export default PageLoader;
