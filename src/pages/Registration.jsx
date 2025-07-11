import React, { useContext, useState } from "react";
import logo from "@/assets/logo.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import dogYellow from "@/assets/Illustration/dog-yellow.svg";
import catYellow from "@/assets/Illustration/cat-yellow.svg";
import catSvg from "@/assets/Illustration/Cat.svg";
import dogBlue from "@/assets/Illustration/dog-blue.svg";
import uploadImageCloudinary from "@/utils/cloudinary__upload__";
import { AuthContext } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01FreeIcons, Image02Icon, ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons/index";
import Navbar from "@/components/navbar/Navbar";

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name must be at least 3 characters")
        .max(50, "Name must be less than 20 characters")
        .required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])/, "Password must contain at least one uppercase and one lowercase letter")
        .required("Password is required"),
    photo: Yup.mixed()
        .required("Image required")
        .test("fileSize", "File size must be less than 5MB", (value) => {
            if (!value) return false;
            return value.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Only Images are required", (value) => {
            if (!value) return false;
            return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(value.type);
        }),
});

const Registration = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, updateUser, signInWithGoogle, signInWithFacebook, setLoading } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-yellow-bg-light relative overflow-hidden">
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

            {/* Registration Form */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                    <div className="flex items-center justify-center py-8">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    {/* Title and Subtitle */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-4xl font-bold text-base-black mb-4">
                            Start Your Pet Love Story Today
                        </h1>
                        <p className="text-pg-base text-sm md:text-base">
                            Create your account to discover amazing pets and begin your adoption journey.
                        </p>
                    </div>

                    <div className="bg-base-white backdrop-blur-sm rounded-2xl p-8 border border-gray-border shadow-card-primary">
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                                photo: null,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                try {
                                    setUploading(true);
                                    // Upload image to Cloudinary
                                    const uploadResult = await uploadImageCloudinary(values.photo);
                                    if (!uploadResult.success) {
                                        throw new Error(uploadResult.error);
                                    }
                                    const name = values.name;
                                    const email = values.email;
                                    const password = values.password;
                                    const photoURL = uploadResult.url;
                                    // Create user with Firebase Auth
                                    await createUser(email, password);
                                    await updateUser({ displayName: name, photoURL });
                                    toast.success("Registration successful!");
                                    resetForm();
                                    navigate("/", {
                                        state: {
                                            message: "Congrats! Registration Successful!",
                                            type: "success",
                                        },
                                    });
                                } catch (error) {
                                    toast.error(error.message || "Registration failed. Please try again.");
                                } finally {
                                    setUploading(false);
                                    setSubmitting(false);
                                    setLoading(false);
                                }
                            }}>
                            {({ isSubmitting, errors, touched, values, setFieldValue }) => {
                                // Image change handler for Formik
                                const handleImageChange = (event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        setFieldValue("photo", file);
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setImagePreview(e.target.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                };
                                return (
                                    <Form className="login-form space-y-6">
                                        {/* Name Field */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray- mb-2">
                                                Your Name
                                            </label>
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Enter your full name"
                                                className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-base-black rounded-lg transition-all duration-200 ${
                                                    errors.name && touched.name && values.name !== ""
                                                        ? "border-base-red bg-red-light"
                                                        : "border-gray-border bg-base-white"
                                                }`}
                                            />
                                            {errors.name && touched.name && values.name !== "" && (
                                                <div className="text-red-medium text-sm mt-1">{errors.name}</div>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-base-black mb-2">
                                                Your Email
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email address"
                                                className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-base-black rounded-lg transition-all duration-200 ${
                                                    errors.email && touched.email && values.email !== ""
                                                        ? "border-base-red bg-red-light"
                                                        : "border-gray-border bg-base-white"
                                                }`}
                                            />
                                            {errors.email && touched.email && values.email !== "" && (
                                                <div className="text-red-medium text-sm mt-1">{errors.email}</div>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div className="relative">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-base-black mb-2">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Field
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Your Password here"
                                                    className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-base-black rounded-lg transition-all duration-200 ${
                                                        errors.name && touched.name && values.name !== ""
                                                            ? "border-base-red bg-red-light"
                                                            : "border-gray-border bg-base-white"
                                                    }`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-3 text-gray-medium hover:text-base-rose focus:outline-none cursor-pointer transition-colors duration-500 ease-in-out">
                                                    {showPassword ? (
                                                        <HugeiconsIcon icon={ViewOffIcon} />
                                                    ) : (
                                                        <HugeiconsIcon icon={ViewIcon} />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && touched.password && values.password !== "" && (
                                                <div className="text-red-medium text-sm mt-1">{errors.password}</div>
                                            )}
                                        </div>

                                        {/* Photo Upload */}
                                        <div>
                                            <label
                                                htmlFor="photo"
                                                className="block text-sm font-medium text-base-black mb-2">
                                                Profile Photo
                                            </label>
                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="sr-only"
                                                        id="photo-upload"
                                                        disabled={imagePreview ? true : false}
                                                    />
                                                    <label
                                                        htmlFor={imagePreview ? undefined : "photo-upload"}
                                                        className={`block w-full h-24 px-4 py-3 border-2 border-dashed rounded-lg transition-all duration-500 ${
                                                            !imagePreview
                                                                ? "cursor-pointer hover:border-blue-coral hover:bg-blue-bg"
                                                                : ""
                                                        } ${
                                                            errors.photo && touched.photo
                                                                ? "border-base-red bg-red-light"
                                                                : "border-gray-border bg-base-white"
                                                        } relative overflow-hidden`}>
                                                        {imagePreview ? (
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <img
                                                                    src={imagePreview}
                                                                    alt="Preview"
                                                                    className="w-full h-full object-contain p-2"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setFieldValue("photo", null);
                                                                        setImagePreview(null);
                                                                    }}
                                                                    className="absolute top-2 right-2 w-8 h-8 bg-pg-base cursor-pointer hover:bg-base-black rounded-full flex items-center justify-center z-10 transition-all duration-200 shadow-md">
                                                                    <HugeiconsIcon
                                                                        className="text-base-white"
                                                                        size={12}
                                                                        icon={Cancel01FreeIcons}
                                                                    />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            /* Default Upload UI */
                                                            <div className="text-center h-full flex flex-col items-center justify-center">
                                                                <HugeiconsIcon
                                                                    className="text-gray-medium"
                                                                    icon={Image02Icon}
                                                                />
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-medium">
                                                                        <span className="font-medium text-base-orange">
                                                                            Click to upload
                                                                        </span>{" "}
                                                                        or drag and drop
                                                                    </p>
                                                                    <p className="text-sm text-gray-medium">
                                                                        PNG, JPG, WebP
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                            {errors.photo && touched.photo && values.photo !== null && (
                                                <div className="text-base-red text-sm mt-1">{errors.photo}</div>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || uploading}
                                            className="w-full font-semibold py-6 px-8 rounded-lg transition-colors duration-600 ease-in-out hover:bg-hover-rose-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-white"
                                            style={{
                                                backgroundColor: "#E86F69",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSubmitting && !uploading) {
                                                    e.target.style.backgroundColor = "#E34D46";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSubmitting && !uploading) {
                                                    e.target.style.backgroundColor = "#E86F69";
                                                }
                                            }}>
                                            {isSubmitting ? "Creating Account" : "Create Account"}
                                        </Button>
                                    </Form>
                                );
                            }}
                        </Formik>

                        {/* Social Logins */}
                        <div className="mt-6 space-y-3">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-light" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-base-white text-gray-dark">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={async () => {
                                        try {
                                            await signInWithGoogle();

                                            toast.success("Congrats! Registration successful!");
                                            navigate("/", {
                                                state: {
                                                    message: "Registration Successful!",
                                                    type: "success",
                                                },
                                            });
                                        } catch (error) {
                                            toast.error(error.message || "Registration failed. Please try again.");
                                        }
                                    }}
                                    className="w-full inline-flex justify-center items-center px-4 py-2 rounded-lg text-md border border-gray-light font-medium text-gray-700 bg-white hover:shadow-card-primary cursor-pointer transition-all duration-600 ease-in-out">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </button>

                                {/* Facebook Login */}
                                <button
                                    type="button"
                                    onClick={async () => {
                                        try {
                                            await signInWithFacebook();

                                            toast.success("Congrats! Registration successful!");
                                            navigate("/", {
                                                state: {
                                                    message: "Registration successful!",
                                                    type: "success",
                                                },
                                            });
                                        } catch (error) {
                                            toast.error(error.message || "Registration failed. Please try again.");
                                        }
                                    }}
                                    className="w-full inline-flex justify-center items-center px-4 py-2 rounded-lg text-md border border-gray-light font-medium text-gray-700 bg-white hover:shadow-card-primary cursor-pointer transition-all duration-600 ease-in-out">
                                    <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                        </div>

                        {/* Login if already have account */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600 text-sm">
                                Already have an account?{" "}
                                <Link
                                    to="/auth/login"
                                    className="text-base-rose hover:text-hover-rose-dark font-medium hover:underline ">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
