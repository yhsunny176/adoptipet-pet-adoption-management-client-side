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
import "swiper/css/effect-fade";
import "./css/swiper.css";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "../ui/button";
import { Link } from "react-router";

const CallToAction = () => {
    const { theme } = useTheme();
    return (
        <div className="flex flex-1 max-w-11/12 lg:max-w-10/12 xl:max-w-9/12 mx-auto bg-no-repeat">
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-16 lg:gap-x-24">
                    {/* Left Side content */}
                    <div className="grid grid-cols-1 auto-rows-max gap-8">
                        {/* Image Mobile */}
                        <div className="image-container md:hidden relative h-[400px] md:h-[480px] xl:h-[680px] w-full col-start-1">
                            {/* Light overlay */}
                            <div className="absolute inset-0 bg-black opacity-30 pointer-events-none z-10 h-full w-full" />

                            {/* Swiper */}
                            <Swiper
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
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

                        {/* Text contents */}
                        <div className="space-y-4">
                            {/* Heading Subtitle */}
                            <div className="space-y-6 *:text-center">
                                <h1 className="text-3xl leading-12 md:text-5xl text-center md:text-left font-bold text-heading-color md:leading-heading-xl">
                                    Transform Lives Today Adopt, Love, Save Together
                                </h1>
                                <p
                                    className={
                                        theme === "light"
                                            ? "text-md md:text-xl text-pg-base leading-pg-lg font-bold"
                                            : "text-md md:text-xl text-pg-base leading-pg-lg font-bold"
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
                        <div className="image-container hidden md:block relative h-[400px] md:h-[480px] xl:h-[680px] w-full col-start-1">
                            {/* Light overlay */}
                            <div className="absolute inset-0 bg-black opacity-30 pointer-events-none z-10 h-full w-full" />

                            {/* Swiper */}
                            <Swiper
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
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
                    <div className="grid grid-cols-1 auto-rows-max gap-8">
                        {/* Right Image Swiper */}
                        <div className="image-container relative h-[380px] md:h-[480px] xl:h-[680px] w-full">
                            {/* Light overlay */}
                            <div className="absolute inset-0 bg-black opacity-30 pointer-events-none z-10 h-full w-full" />

                            {/* Swiper */}
                            <Swiper
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: false }}
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
                        <div className="space-y-4 flex flex-col items-center">
                            {/* Heading Subtitle */}
                            <div className="space-y-6 *:text-center">
                                <h1 className="text-3xl leading-12 md:text-5xl text-center md:text-left font-bold text-heading-color md:leading-heading-xl">
                                    Be the Miracle They’ve Been Waiting For
                                </h1>
                                <p
                                    className={
                                        theme === "light"
                                            ? "text-md md:text-xl text-pg-base leading-pg-lg font-bold"
                                            : "text-md md:text-xl text-pg-base leading-pg-lg font-bold"
                                    }>
                                    Here's a story on Lucky, From Abandoned to Adored -
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
                                    Sarah a wonderful and kind person, adopted and gently brought him in, gave him warm
                                    baths, healing care, and most of all—love. For weeks, Lucky remained silent, eyes
                                    unsure. But with every gentle touch and kind word, his spirit slowly returned. The
                                    first time he wagged his tail, the whole shelter cheered. You can also be a savior
                                    like Sarah, with AdoptiPet you can adopt rescued animals and spread love to them.
                                </p>
                            </div>

                            {/* Button */}
                            <Button
                                asChild
                                className={
                                    theme === "light"
                                        ? "bg-base-rose text-base-white py-8 px-6 text-lg mt-4 hover:bg-base-rose-dark transition-colors duration-500 ease-in-out"
                                        : "bg-base-rose text-base-white py-8 px-6 text-lg mt-4 hover:bg-base-rose-dark transition-colors duration-500 ease-in-out"
                                }>
                                <Link to="/pet-listing">Check Pet Listings</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
