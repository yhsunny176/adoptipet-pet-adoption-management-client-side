import Banner from "@/components/banner/Banner";
import PetCategoryButtons from "@/components/buttons-custom/PetCategoryButtons";
import AboutUs from "@/components/sections/AboutUs";
import CallToAction from "@/components/sections/CallToAction";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import boneImg from "@/assets/Section Image/bone.png";
import boneImg2 from "@/assets/Section Image/bone2.png";
import Testimonials from "@/components/sections/Testimonials";
import Subscribe from "@/components/sections/Subscribe";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const { theme } = useTheme();

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        navigate(`/category-pets/${category}`);
    };

    return (
        <div>
            {/* Banner */}
            <section className="py-12 bg-background-primary">
                <Banner />
            </section>

            {/* Pet Category Buttons */}
            <section>
                <div className="py-20 flex flex-col bg-background-tertiary">
                    <div className="flex-1 max-w-11/12 mx-auto w-full overflow-x-auto">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-center text-heading-color">
                                Explore Pet Categories
                            </h2>
                            <p className="text-center text-base text-pg-base mb-4">
                                Find your perfect companion by browsing different pet categories available for adoption.
                            </p>
                        </div>
                        <PetCategoryButtons
                            onCategorySelect={handleCategorySelect}
                            selectedCategory={selectedCategory}
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section
                className={
                    theme === "light"
                        ? "flex flex-col min-h-max bg-blue-bg py-24"
                        : "flex flex-col min-h-max bg-background-secondary py-24"
                }>
                <CallToAction />
            </section>

            {/* About Us Section */}
            <section
                className={"flex flex-col min-h-max bg-background-secondary py-24"}
                style={{
                    backgroundImage: `url(${boneImg}), url(${boneImg2}), url(${boneImg2})`,
                    backgroundPosition: "30px 40px, 110px 120px,calc(100% + 50px) calc(100% - 60px)",
                    backgroundSize: "120px auto, 80px auto, 120px auto",
                    backgroundRepeat: "no-repeat, no-repeat, no-repeat",
                }}>
                <AboutUs />
            </section>

            {/* Testimonials */}
            <section
                className={theme === "light" ? "bg-blue-bg" : "bg-background-quaternary"}
                style={{
                    backgroundImage: `url(${boneImg2}), url(${boneImg})`,
                    backgroundPosition: "-40px 80px, calc(100% + 25px) calc(100% - 30px)",
                    backgroundSize: "80px auto, 80px auto",
                    backgroundRepeat: "no-repeat, no-repeat",
                }}>
                <Testimonials />
            </section>

            {/* Subscribe for Notifications */}
            <div className="flex flex-col min-h-max py-12 bg-background-secondary">
                <Subscribe/>
            </div>
        </div>
    );
};

export default Home;
