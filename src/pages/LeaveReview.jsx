import React from "react";
import ReviewForm from "@/components/forms/ReviewForm";
import { Link } from "react-router";
import { ChevronLeft, Star, Heart } from "lucide-react";

const LeaveReview = () => {
    const handleReviewSubmitSuccess = (reviewData) => {
        // You can handle the successful review submission here
        // For example, redirect to testimonials page or show additional confirmation
        console.log("Review submitted successfully:", reviewData);
    };

    return (
        <div className="min-h-screen bg-background-tertiary">
            {/* Main Content */}
            <div className="main-container py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-heading-color">Leave a Review</h1>
                        <p className="text-lg text-gray-dark max-w-11/12 sm:max-w-10/12 xl:max-w-4xl mx-auto">
                            Your feedback helps us improve and helps other pet lovers discover the joy of adoption
                            through AdoptiPet.
                        </p>
                    </div>

                    {/* Review Form */}
                    <ReviewForm onSubmitSuccess={handleReviewSubmitSuccess} />
                </div>
            </div>
        </div>
    );
};

export default LeaveReview;
