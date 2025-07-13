import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "@/contexts/AuthContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons/index";
import PageLoader from "../loader/PageLoader";

// Validation schema for login
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { signInUser, signInWithGoogle, signInWithFacebook, setUser, loading, user } = useContext(AuthContext);
    const location = useLocation();
    const from = location?.state.from?.pathname || "/";
    if (user) return <Navigate to={from} replace={true} />;
    if (loading) return <PageLoader />;

    return (
        <div>
            {/* Login Form */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                    <div className="flex items-center justify-center py-8">
                        <Link to="/">
                            <img src={logo} alt="logo" className="h-10 w-auto" />
                        </Link>
                    </div>
                    {/* Title and Subtitle */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-4xl font-bold text-black-base mb-4">
                            Start Your Pet Love Story Today
                        </h1>
                        <p className="text-pg-black text-sm md:text-base">
                            Create your account to discover amazing pets and begin your adoption journey.
                        </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={validationSchema}
                            validateOnMount={false}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const { email, password } = values;
                                    const userCredential = await signInUser(email, password);
                                    const user = userCredential.user;
                                    if (user) setUser(user);

                                    toast.success("Login successful! Welcome back!");
                                    setSubmitting(false);
                                    navigate(from, { replace: true });
                                } catch (error) {
                                    let errorMessage = "Login failed. One or more credentials are wrong.";
                                    if (error.code === "auth/user-not-found") {
                                        errorMessage = "No account found with this email. Please register.";
                                    } else if (error.code === "auth/wrong-password") {
                                        errorMessage = "Incorrect password. Please try again.";
                                    } else if (error.code === "auth/too-many-requests") {
                                        errorMessage = "Too many failed login attempts. Please try again later.";
                                    }
                                    toast.error(errorMessage);
                                    setSubmitting(false);
                                    return;
                                }
                            }}>
                            {({ isSubmitting, errors, touched }) => {
                                return (
                                    <Form className="login-form space-y-6">
                                        {/* Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-black-base mb-2">
                                                Your Email
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email address"
                                                className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-black-base rounded-lg transition-all duration-200 ${
                                                    errors.email && touched.email
                                                        ? "border-red-base bg-red-light"
                                                        : "border-gray-border bg-base-white"
                                                }`}
                                            />
                                            {errors.email && touched.email && (
                                                <div className="text-red-medium text-sm mt-1">{errors.email}</div>
                                            )}
                                        </div>
                                        {/* Password */}
                                        <div className="relative">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-black-base mb-2">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Field
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Your Password here"
                                                    className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-black-base rounded-lg transition-all duration-200 ${
                                                        errors.password && touched.password
                                                            ? "border-red-base bg-red-light"
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
                                            {errors.password && touched.password && (
                                                <div className="text-red-medium text-sm mt-1">{errors.password}</div>
                                            )}
                                        </div>

                                        {/* Forgot Password Link */}
                                        <div className="text-left">
                                            <Link
                                                href="/auth/forgot-password"
                                                className="text-sm text-base-rose hover:text-hover-rose-dark font-medium hover:underline">
                                                Forgot your password?
                                            </Link>
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
                                            {isSubmitting ? "Signing In" : "Sign In"}
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
                                            const result = await signInWithGoogle();
                                            const user = result.user;
                                            setUser(user);

                                            toast.success("Login successful!");
                                            navigate(from, { replace: true });
                                        } catch (error) {
                                            toast.error(error.message || "Login failed. Please try again.");
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
                                            const result = await signInWithFacebook();
                                            const user = result.user;

                                            setUser(user);

                                            toast.success("Login successful!");
                                            navigate(from, { replace: true });
                                        } catch (error) {
                                            toast.error(error.message || "Login Failed. Please try again.");
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

                        {/* Register if no account */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600 text-sm">
                                Don't have an account?{" "}
                                <Link
                                    to="/auth/register"
                                    className="text-base-rose hover:text-hover-rose-dark font-medium hover:underline ">
                                    Create an Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
