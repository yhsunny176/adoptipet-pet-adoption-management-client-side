import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

// Validation schema for review
const validationSchema = Yup.object({
    rating: Yup.number()
        .min(1, "Please select a rating")
        .max(5, "Rating cannot exceed 5 stars")
        .required("Rating is required"),
    comment: Yup.string()
        .min(10, "Comment must be at least 10 characters")
        .max(500, "Comment must be less than 500 characters")
        .required("Comment is required"),
});

// Star Rating Component
const StarRating = ({ rating, onRatingChange, error, touched, disabled = false }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex flex-col">
            <label className="block text-base font-medium !text-heading-color mb-2">Your Rating</label>
            <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={disabled}
                        className={`transition-colors duration-200 ${
                            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-yellow-400"
                        } ${
                            star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"
                        } focus:outline-none`}
                        onMouseEnter={() => !disabled && setHoverRating(star)}
                        onMouseLeave={() => !disabled && setHoverRating(0)}
                        onClick={() => !disabled && onRatingChange(star)}>
                        <Star
                            size={32}
                            fill={star <= (hoverRating || rating) ? "currentColor" : "none"}
                            className="transition-all duration-200"
                        />
                    </button>
                ))}
            </div>
            <div className="text-sm text-pg-base mb-2">
                {rating > 0 && (
                    <span>
                        You rated: {rating} star{rating !== 1 ? "s" : ""}
                    </span>
                )}
            </div>
            {error && touched && <div className="text-red-medium text-sm">{error}</div>}
        </div>
    );
};

const ReviewForm = ({ onSubmitSuccess }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [hasReviewed, setHasReviewed] = useState(false);
    const [existingReview, setExistingReview] = useState(null);
    const [checkingReview, setCheckingReview] = useState(true);

    // Check if user has already submitted a review
    useEffect(() => {
        const checkUserReview = async () => {
            if (!user?.email) {
                setCheckingReview(false);
                return;
            }

            try {
                const response = await axiosSecure.get(`/check-user-review/${user.email}`);
                if (response.data.success) {
                    setHasReviewed(response.data.hasReviewed);
                    setExistingReview(response.data.review);
                }
            } catch (error) {
                console.error("Error checking user review:", error);
                toast.error("Failed to check review status");
            } finally {
                setCheckingReview(false);
            }
        };

        checkUserReview();
    }, [user?.email, axiosSecure]);

    const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Prepare review data for backend
            const reviewData = {
                userId: user?.uid,
                userName: user?.displayName || "Anonymous",
                userEmail: user?.email,
                userPhoto: user?.photoURL,
                rating: values.rating,
                comment: values.comment,
            };

            // Send review data to backend API
            const response = await axiosSecure.post("/submit-review", reviewData);

            if (response.data.success) {
                // Show success message
                toast.success("Thank you for your review! It has been submitted successfully.");

                // Reset form
                resetForm();

                // Call success callback if provided
                if (onSubmitSuccess) {
                    onSubmitSuccess({
                        ...reviewData,
                        _id: response.data.result.insertedId,
                        created_at: new Date().toISOString(),
                    });
                }
            } else {
                throw new Error(response.data.message || "Failed to submit review");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit review. Please try again.");
            console.error("Review submission error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className="bg-background-quaternary backdrop-blur-sm rounded-2xl p-8 border border-gray-border shadow-card-primary text-center">
                <h3 className="text-xl font-semibold text-heading-color mb-4">Please Login to Leave a Review</h3>
                <p className="text-pg-base">You need to be logged in to share your experience with our platform.</p>
            </div>
        );
    }

    // Show loading state while checking review status
    if (checkingReview) {
        return (
            <div className="bg-background-tertiary backdrop-blur-sm rounded-2xl p-8 border border-gray-border shadow-card-primary text-center">
                <h3 className="text-xl font-semibold text-heading-color mb-4">Loading...</h3>
                <p className="text-pg-base">Checking your review status...</p>
            </div>
        );
    }

    // Show message if user has already reviewed
    if (hasReviewed && existingReview) {
        return (
            <div className="bg-background-tertiary backdrop-blur-sm rounded-2xl p-8 border border-gray-border shadow-card-primary">
                {/* Already Reviewed Message */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Star className="h-5 w-5 text-blue-400" fill="currentColor" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                You have already submitted your review
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>Thank you for your feedback! You can only submit one review per account.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-heading-color mb-2">Your Review</h3>
                    <p className="text-pg-base">Here's the review you submitted previously</p>
                </div>

                {/* Display existing review (disabled form) */}
                <div className="review-form space-y-6 opacity-75">
                    {/* Star Rating - Disabled */}
                    <StarRating
                        rating={existingReview.rating}
                        onRatingChange={() => {}}
                        disabled={true}
                    />

                    {/* Comment Field - Disabled */}
                    <div>
                        <label htmlFor="comment" className="block text-base font-medium !text-heading-color mb-2">
                            Your Review Comment
                        </label>
                        <textarea
                            value={existingReview.comment}
                            disabled
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-border rounded-lg transition-all duration-200 resize-none bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                        <div className="flex justify-between items-center mt-1">
                            <div className="text-sm text-gray-dark ml-auto">
                                {existingReview.comment.length}/500 characters
                            </div>
                        </div>
                    </div>

                    {/* User Info Display */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center space-x-3">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName || "User"}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-base-rose/20 flex items-center justify-center">
                                    <span className="text-base-rose font-semibold">
                                        {(user?.displayName || user?.email || "U").charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-black-base">
                                    {user?.displayName || "Anonymous User"}
                                </p>
                                <p className="text-sm text-gray-600">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Disabled Submit Button */}
                    <Button
                        disabled={true}
                        className="w-full font-semibold py-6 px-8 rounded-lg transition-colors duration-600 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-white bg-gray-400">
                        Review Already Submitted
                    </Button>
                </div>

                {/* Review submission date */}
                <div className="mt-4 text-center text-sm text-gray-500">
                    Submitted on: {new Date(existingReview.created_at).toLocaleDateString()}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-tertiary backdrop-blur-sm rounded-2xl p-8 border border-gray-border shadow-card-primary">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-heading-color mb-2">Share Your Experience</h3>
                <p className="text-pg-base">Help others by sharing your thoughts about AdoptiPet</p>
            </div>

            <Formik
                initialValues={{
                    rating: 0,
                    comment: "",
                }}
                validationSchema={validationSchema}
                validateOnMount={false}
                onSubmit={handleFormSubmit}>
                {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                    <Form className="review-form space-y-6">
                        {/* Star Rating */}
                        <StarRating
                            rating={values.rating}
                            onRatingChange={(rating) => setFieldValue("rating", rating)}
                            error={errors.rating}
                            touched={touched.rating}
                        />

                        {/* Comment Field */}
                        <div>
                            <label htmlFor="comment" className="block text-base font-medium !text-heading-color mb-2">
                                Your Review Comment
                            </label>
                            <Field
                                as="textarea"
                                name="comment"
                                placeholder="Share your experience with AdoptiPet. What did you like most? How was the adoption process? Any suggestions for improvement?"
                                rows={5}
                                className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-black-base rounded-lg transition-all duration-200 resize-none ${
                                    errors.comment && touched.comment
                                        ? "border-red-base bg-red-light"
                                        : "border-gray-border bg-base-white"
                                }`}
                            />
                            <div className="flex justify-between items-center mt-1">
                                {errors.comment && touched.comment && (
                                    <div className="text-red-medium text-sm">{errors.comment}</div>
                                )}
                                <div className="text-sm text-gray-dark ml-auto">
                                    {values.comment.length}/500 characters
                                </div>
                            </div>
                        </div>

                        {/* User Info Display */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center space-x-3">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || "User"}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-base-rose/20 flex items-center justify-center">
                                        <span className="text-base-rose font-semibold">
                                            {(user?.displayName || user?.email || "U").charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-black-base">
                                        {user?.displayName || "Anonymous User"}
                                    </p>
                                    <p className="text-sm text-gray-600">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full font-semibold py-6 px-8 rounded-lg transition-colors duration-600 ease-in-out hover:bg-hover-rose-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-white"
                            style={{
                                backgroundColor: "#E86F69",
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.backgroundColor = "#E34D46";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.backgroundColor = "#E86F69";
                                }
                            }}>
                            {isSubmitting ? "Submitting Review..." : "Submit Review"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ReviewForm;
