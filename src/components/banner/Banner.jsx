import React from "react";
import catImage from "@/assets/Hero/cat-image-01.png";
import dogImage1 from "@/assets/Hero/dog-image-01.png";
import dogImage2 from "@/assets/Hero/dog-image-02.png";
import bgElems from "@/assets/Hero/Bg Pet elements.png";
import { Button } from "../ui/button";
import { Link } from "react-router";
const Banner = () => {
    return (
        <div className="min-h-screen bg-yellow-bg-light relative">
            <div className="py-12 lg:grid lg:grid-cols-12 lg:max-w-11/12 lg:mx-auto lg:gap-4 lg:items-center xl:max-w-11/12 xl:gap-4 xl:mx-auto 2xl:max-w-10/12 2xl:gap-4 relative z-0">
                <div className="hidden lg:block absolute lg:right-0 lg:z-0 w-auto h-full">
                    <img src={bgElems} className="w-full h-full" alt="pet elements" />
                </div>
                <div className="lg:col-span-7 xl:col-span-6 2xl:col-span-7">
                    {/* Text Contents */}
                    <div className="max-w-11/12 py-4 mx-auto lg:mx-0 lg:max-w-full">
                        <p className="text-sm text-center mb-3 text-base-orange font-bold sm:text-lg lg:text-md lg:text-left">
                            Love.Adopt.Repeat
                        </p>
                        {/* Title & Subtitle */}
                        <div className="sm:max-w-10/12 sm:mx-auto lg:*:text-left lg:max-w-full lg:mx-0">
                            <h1 className="text-3xl font-semibold text-center leading-9 text-base-black mb-6 sm:text-4xl sm:leading-12 md:text-6xl md:leading-20 lg:text-5xl lg:leading-14 xl:text-6xl xl:leading-tight 2xl:text-7xl">
                                Every Pet Deserves a Loving Forever Home
                            </h1>
                            <p className="text-center leading-pg-base text-pg-base max-w-11/12 mx-auto lg:mx-0 lg:max-w-10/12 lg:leading-pg-lg xl:text-lg xl:max-w-3xl 2xl:text-xl">
                                We meticulously select and manage buyers and sellers to ensure that each pet we deliver
                                is happy, healthy, and ready to become a cherished member of your family.
                            </p>
                        </div>

                        {/* Service info */}
                        <div className="flex flex-col max-w-11/12 items-center justify-center mx-auto gap-10 py-10 sm:flex-row sm:gap-16 lg:items-center lg:justify-start lg:gap-12 lg:mx-0 lg:pt-8 lg:pb-2">
                            <div className="flex-col items-center xl:mt-3">
                                <h2 className="font-pg text-4xl font-bold text-pg-base text-center sm:text-5xl xl:text-6xl 2xl:text-7xl">
                                    450+
                                </h2>
                                <p className="text-base text-pg-base text-center mt-2 sm:text-lg xl:text-xl 2xl:text-2xl">
                                    Pets to Families
                                </p>
                            </div>
                            <div className="flex-col items-center xl:mt-3">
                                <h2 className="font-pg text-4xl font-bold text-pg-base text-center sm:text-5xl xl:text-6xl 2xl:text-7xl">
                                    10+
                                </h2>
                                <p className="text-base text-pg-base text-center mt-2 sm:text-lg xl:text-xl 2xl:text-2xl">
                                    Years of Experience
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center lg:block relative z-10">
                        <Button
                            size="xl"
                            variant="default"
                            className={
                                "relative z-10 bg-base-rose text-base-white mt-0 hover:bg-hover-rose-dark transition-colors duration-600 lg:mt-2 lg:text-lg cursor-pointer xl:text-xl xl:px-8 2xl:text-2xl 2xl:px-10 2xl:py-7"
                            }
                            asChild>
                            <Link to="/pet-listing">Adopt a Pet</Link>
                        </Button>
                    </div>
                </div>

                {/* Image Contents */}
                <div className="main-wrapper mt-12 lg:col-span-5 xl:col-span-6 xl:pl-4 2xl:col-span-5 2xl:pl-0">
                    {/* Mobile to Medium Layout */}
                    <div className="lg:hidden">
                        <div className="max-w-11/12 mx-auto h-full pb-4 flex items-end gap-6 sm:gap-14 sm:justify-center">
                            <div>
                                <img src={dogImage1} alt="image of a australian shepherd dog with tongue open" />
                            </div>
                            <div>
                                <img src={dogImage2} alt="image of a shiba inu dog looking straight up cutely" />
                            </div>
                        </div>
                        <div className="flex max-w-11/12 h-full mx-auto items-center justify-center py-4">
                            <div className="max-w-44 sm:max-w-2xs">
                                <img src={catImage} alt="image of a ginger cat looking up cutely" />
                            </div>
                        </div>
                    </div>

                    {/* Large Screen Layout */}
                    <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4 xl:gap-4 2xl:gap-8 xl:max-w-full 2xl:max-w-5xl xl:mx-auto">
                        {/* Left column  */}
                        <div className="w-5/12 flex items-center xl:w-5/12">
                            <img
                                src={catImage}
                                alt="image of a ginger cat looking up cutely"
                                className="w-full h-auto object-contain rounded-lg xl:rounded-xl 2xl:rounded-2xl"
                            />
                        </div>

                        {/* Right column */}
                        <div className="w-6/12 flex flex-col space-y-10 xl:space-y-8 2xl:space-y-16 xl:w-6/12">
                            <div className="w-full">
                                <img
                                    src={dogImage1}
                                    alt="image of a australian shepherd dog with tongue open"
                                    className="w-full h-auto object-contain rounded-lg xl:rounded-xl 2xl:rounded-2xl xl:max-w-xs xl:mx-auto 2xl:max-w-sm"
                                />
                            </div>

                            <div className="w-full">
                                <img
                                    src={dogImage2}
                                    alt="image of a shiba inu dog looking straight up cutely"
                                    className="w-full h-auto object-contain rounded-lg xl:rounded-xl 2xl:rounded-2xl xl:max-w-xs xl:mx-auto 2xl:max-w-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
