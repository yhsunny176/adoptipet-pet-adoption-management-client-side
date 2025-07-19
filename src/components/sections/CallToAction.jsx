import React from "react";
import secImg1 from "@/assets/Section Image/sec-img-1.webp";
import secImg2 from "@/assets/Section Image/sec-img-2.webp";
import secImg3 from "@/assets/Section Image/sec-img-3.webp";
import secImg4 from "@/assets/Section Image/sec-img-4.webp";
import secImg5 from "@/assets/Section Image/sec-img-5.webp";
import secImg6 from "@/assets/Section Image/sec-img-6.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./css/swiper.css";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "../ui/button";
import { Link } from "react-router";

const CallToAction = () => {
    const { theme } = useTheme();
    return (
        <div className="flex flex-1 max-w-9/12 mx-auto">
            <div>
                <div className="grid grid-cols-1 auto-rows-max lg:grid-cols-2 gap-y-8 gap-x-24">
                    {/* Left Side content */}
                    <div className="grid grid-cols-1 auto-rows-max gap-8">
                        {/* Text contents */}
                        <div className="space-y-4">
                            {/* Heading Subtitle */}
                            <div className="space-y-6">
                                <h1 className="text-5xl font-bold text-heading-color leading-heading-xl">
                                    Transform Lives Today Adopt, Love, Save Together
                                </h1>
                                <p
                                    className={
                                        theme === "light" ? "text-pg-base leading-pg-lg" : "text-pg-base leading-pg-lg"
                                    }>
                                    Every rescued pet becomes a loyal companion who will fill your home with
                                    unconditional love and endless joy.
                                </p>
                            </div>
                            {/* Paragraph */}
                            <div>
                                <p
                                    className={
                                        theme === "light"
                                            ? "leading-pg-lg text-gray-dark"
                                            : "leading-pg-lg text-gray-medium"
                                    }>
                                    When you choose to adopt, you're not just saving a life—you're gaining a devoted
                                    friend who will change your world in the most beautiful ways. These incredible
                                    animals have been waiting patiently for someone just like you, someone who
                                    understands that the bond between human and pet transcends words.
                                </p>
                            </div>
                        </div>
                        {/* Left Image Swiper */}
                        <div className="image-container relative h-[700px] w-full col-start-1">
                            {/* Light overlay */}
                            <div className="absolute inset-0 bg-black opacity-30 pointer-events-none z-10 h-full w-full" />

                            {/* Swiper */}
                            <Swiper
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                keyboard={{ enabled: true }}
                                effect="fade"
                                modules={[Autoplay, Keyboard, EffectFade, Pagination]}
                                className="h-full w-full relative z-20">
                                <SwiperSlide className="col-start-1 relative h-full">
                                    <img
                                        src={secImg4}
                                        className="w-full h-full object-cover"
                                        alt="Image of a woman holding a pet cat sitting in sofa"
                                    />
                                </SwiperSlide>
                                <SwiperSlide className="col-start-1 relative h-full">
                                    <img
                                        src={secImg5}
                                        className="w-full h-full object-cover"
                                        alt="Image of a woman holding a pet cat sitting in sofa"
                                    />
                                </SwiperSlide>
                                <SwiperSlide className="col-start-1 relative h-full">
                                    <img
                                        src={secImg6}
                                        className="w-full h-full object-cover"
                                        alt="Image of a woman holding a pet cat sitting in sofa"
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>

                    {/* Right Side content */}
                    <div className="grid grid-cols-1 col-start-2 auto-rows-max gap-8">
                        {/* Right Image Swiper */}
                        <div className="image-container relative h-[600px] w-full">
                            {/* Light overlay */}
                            <div className="absolute inset-0 bg-black opacity-30 pointer-events-none z-10 h-full w-full" />

                            {/* Swiper */}
                            <Swiper
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                keyboard={{ enabled: true }}
                                effect="fade"
                                modules={[Autoplay, Keyboard, EffectFade, Pagination]}
                                className="h-full w-full relative z-20">
                                <SwiperSlide className="col-start-1 relative h-full">
                                    <img
                                        src={secImg1}
                                        className="w-full h-full object-cover"
                                        alt="Image of a woman holding a pet cat sitting in sofa"
                                    />
                                </SwiperSlide>
                                <SwiperSlide className="col-start-1 relative h-full">
                                    <img
                                        src={secImg2}
                                        className="w-full h-full object-cover"
                                        alt="Image of a woman holding a pet cat sitting in sofa"
                                    />
                                </SwiperSlide>
                                <SwiperSlide className="col-start-1 relative h-full">
                                    <img
                                        src={secImg3}
                                        className="w-full h-full object-cover"
                                        alt="Image of a woman holding a pet cat sitting in sofa"
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        {/* Text contents */}
                        <div className="space-y-4">
                            {/* Heading Subtitle */}
                            <div className="space-y-6">
                                <h1 className="text-5xl font-bold text-heading-color leading-heading-xl">
                                    Transform Lives Today Adopt, Love, Save Together
                                </h1>
                                <p
                                    className={
                                        theme === "light" ? "text-pg-base leading-pg-lg" : "text-pg-base leading-pg-lg"
                                    }>
                                    Every rescued pet becomes a loyal companion who will fill your home with
                                    unconditional love and endless joy.
                                </p>
                            </div>

                            {/* Paragraph */}
                            <div>
                                <p
                                    className={
                                        theme === "light"
                                            ? "leading-pg-lg text-gray-dark"
                                            : "leading-pg-lg text-gray-medium"
                                    }>
                                    When you choose to adopt, you're not just saving a life—you're gaining a devoted
                                    friend who will change your world in the most beautiful ways. These incredible
                                    animals have been waiting patiently for someone just like you, someone who
                                    understands that the bond between human and pet transcends words.
                                </p>
                            </div>

                            {/* Button */}
                            <Button
                                className={
                                    theme === "light"
                                        ? "bg-base-rose text-base-white py-8 px-6 text-lg mt-4 hover:bg-base-rose-dark transition-colors duration-500 ease-in-out"
                                        : "bg-base-rose text-base-white py-8 px-6 text-lg mt-4 hover:bg-base-rose-dark transition-colors duration-500 ease-in-out"
                                }>
                                    <Link to="/pet-listing"></Link>
                                Check Pet Listings
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
