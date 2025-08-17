import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import "./css/testimonial.css";
import { useTheme } from "@/hooks/useTheme";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import avatarPlaceholder from "../../assets/avatar-placeholder.svg";

const Testimonials = () => {
    const theme = useTheme();
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch reviews from backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch only recent 10 reviews, sorted by createdAt (descending)
                const response = await axiosSecure.get('/reviews?limit=10&page=1&status=active');
                
                if (response.data && response.data.reviews) {
                    setReviews(response.data.reviews);
                } else {
                    setReviews([]);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Failed to load reviews');
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [axiosSecure]);

    // Render star rating
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                size={16}
                className={`${
                    index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                } transition-colors duration-200`}
            />
        ));
    };

    // Loading state
    if (loading) {
        return (
            <section className="w-full main-container py-16">
                <div className="text-center mb-4 text-lg font-semibold text-pg-base uppercase">
                    See What Adopters Say About Our Platform
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-heading-color mb-10 tracking-tight">
                    Testimonials
                </h2>
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-base-rose"></div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="w-full main-container py-16">
                <div className="text-center mb-4 text-lg font-semibold text-pg-base uppercase">
                    See What Adopters Say About Our Platform
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-heading-color mb-10 tracking-tight">
                    Testimonials
                </h2>
                <div className="text-center py-20">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-base-rose text-white rounded-lg hover:bg-base-rose/80 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    // No reviews state
    if (reviews.length === 0) {
        return (
            <section className="w-full main-container py-16">
                <div className="text-center mb-4 text-lg font-semibold text-pg-base">
                    See What Adopters Say About Our Platform
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-heading-color mb-10 tracking-tight">
                    Testimonials
                </h2>
                <div className="text-center py-20">
                    <p className="text-pg-base mb-4">No reviews available yet.</p>
                    <p className="text-base text-base-white">Be the first to share your experience!</p>
                </div>
            </section>
        );
    }

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
                {reviews.map((review, idx) => (
                    <SwiperSlide key={review._id || idx} className="flex items-center justify-center">
                        <div
                            className={
                                "bg-transparent border border-pg-black rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center justify-between h-[380px] max-w-md transition-all duration-300"
                            }>
                            <div className="testimonials-profile-circle w-20 h-20 rounded-full overflow-hidden mb-6 flex items-center justify-center bg-base-rose/10">
                                {review.userPhoto ? (
                                    <img
                                        src={review.userPhoto}
                                        alt={review.userName || "User"}
                                        className="testimonial-avatar w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = avatarPlaceholder;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-base-rose/20 flex items-center justify-center">
                                        <span className="text-base-rose font-semibold text-2xl">
                                            {(review.userName || review.userEmail || "U").charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Star Rating */}
                            <div className="flex items-center justify-center mb-3">
                                {renderStars(review.rating)}
                            </div>
                            
                            <p className="text-pg-base text-center mb-4 line-clamp-4 flex-grow">
                                {review.comment}
                            </p>
                            
                            <div className="mt-auto text-center">
                                <span
                                    className={
                                        theme === "light"
                                            ? "font-semibold text-base-orange text-lg"
                                            : "text-base-rose font-semibold text-lg"
                                    }>
                                    {review.userName || "Anonymous User"}
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;

