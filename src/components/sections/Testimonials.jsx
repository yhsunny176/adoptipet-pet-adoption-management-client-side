import React from "react";
import avatarImg1 from "../../assets/avatars/avatar-1.jpg";
import avatarImg2 from "../../assets/avatars/avatar-2.jpg";
import avatarImg3 from "../../assets/avatars/avatar-3.jpg";
import avatarImg4 from "../../assets/avatars/avatar-4.jpg";
import avatarImg5 from "../../assets/avatars/avatar-5.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "./css/testimonial.css";
import { useTheme } from "@/hooks/useTheme";

const testimonials = [
    {
        name: "Jeet Datta",
        text: "AdoptiPet helped us find the perfect pet for our family. The process was smooth and the support was amazing!",
        image: avatarImg1,
    },
    {
        name: "Sharika Sultana",
        text: "I love the dashboard features and how easy it is to track my adoption requests. Highly recommended!",
        image: avatarImg2,
    },
    {
        name: "Sayif Mahmud",
        text: "The donation campaigns are transparent and impactful. I feel good knowing my help matters.",
        image: avatarImg3,
    },
    {
        name: "Mrittika Islam",
        text: "Great experience from start to finish. The team was so helpful and the pets are well cared for.",
        image: avatarImg4,
    },
    {
        name: "Ovi Rahaman",
        text: "So many adorable pets and such a friendly community. Thank you AdoptiPet!",
        image: avatarImg5,
    },
];

const Testimonials = () => {
    const theme = useTheme();

    return (
        <section className="w-full main-container py-16">
            <div className="text-center mb-4 text-lg font-semibold text-pg-base uppercase">
                See What Adopters Say About Our Platform
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-heading-color mb-10 tracking-tight">
                Testimonials
            </h2>

            <Swiper
                loop={true}
                spaceBetween={24}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                }}
                modules={[Navigation, Autoplay]}
                className="mySwiper w-full">
                {testimonials.map((testimonial, idx) => (
                    <SwiperSlide key={idx} className="flex items-center justify-center">
                        <div
                            className={
                                "bg-transparent border border-pg-black rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center justify-between h-[340px] max-w-md transition-all duration-300"
                            }>
                            <div className="testimonials-profile-circle w-20 h-20 rounded-full overflow-hidden mb-8 flex items-center justify-center bg-base-rose/10">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="testimonial-avatar w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-pg-base text-center mb-4 line-clamp-4">{testimonial.text}</p>
                            <span
                                className={
                                    theme === "light"
                                        ? "font-semibold text-base-orange text-lg mt-auto"
                                        : "text-base-rose"
                                }>
                                {testimonial.name}
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;
