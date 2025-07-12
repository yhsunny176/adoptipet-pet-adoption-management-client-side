import React from "react";
import dogYellow from "@/assets/Illustration/dog-yellow.svg";
import catYellow from "@/assets/Illustration/cat-yellow.svg";
import catSvg from "@/assets/Illustration/Cat.svg";
import dogBlue from "@/assets/Illustration/dog-blue.svg";
import RegistrationForm from "@/components/forms/RegistrationForm";

const Registration = () => {
    return (
        <div className="min-h-screen bg-yellow-bg relative overflow-hidden">
            {/* Cat Illustration - Top Left */}
            <div className="absolute top-5 -left-20 sm:-left-18 md:-left-16 z-0">
                <img
                    src={catYellow}
                    alt=""
                    className="w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-64 xl:h-64"
                />
            </div>

            {/* Dog Illustration - Top Right */}
            <div className="absolute top-5 -right-20 sm:-right-18 md:-right-16 lg:-right-12 xl:-right-8 2xl:-right-4 z-0">
                <img
                    src={dogYellow}
                    alt=""
                    className="w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80"
                />
            </div>

            {/* Dog Blue - Bottom Left */}
            <div className="absolute bottom-0 -left-20 sm:-left-18 md:-left-16 lg:-left-12 xl:-left-8 2xl:-left-4 z-0">
                <img
                    src={dogBlue}
                    alt=""
                    className="w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80"
                />
            </div>

            {/* Cat SVG - Bottom Right */}
            <div className="absolute bottom-0 -right-12 sm:-right-18 md:-right-16 lg:-right-12 xl:-right-8 2xl:-right-4 z-0">
                <img
                    src={catSvg}
                    alt=""
                    className="w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-64 xl:h-64"
                />
            </div>

            <RegistrationForm />
        </div>
    );
};

export default Registration;
