import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
import { AuthContext } from "@/contexts/AuthContext";
import { ChevronLeft } from "lucide-react";

const ForgetPassword = () => {
    const { passwordReset } = useContext(AuthContext);
    const emailRef = useRef();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.email && emailRef.current) {
            emailRef.current.value = location.state.email;
        }
    }, [location]);

    const handleForgetPassword = (event) => {
        event.preventDefault();
        setLoading(true);
        const email = emailRef.current.value;
        passwordReset(email)
            .then(() => {
                toast.success("Password Reset Instructions sent to your email! Please check your email!");
            })
            .catch((error) => {
                toast.error(`${error.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background-secondary relative">
            <div className="absolute top-8 right-8 z-10">
                <Link
                    to="/auth/login"
                    className="font-pg flex items-center font-bold text-base-rose hover:text-base-rose-dark underline transition-colors duration-500">
                    <span className="mb-1">
                        <ChevronLeft />
                    </span>
                    Go back to Login
                </Link>
            </div>
            <div className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-card flex flex-col gap-8 bg-background-tertiary border border-gray-medium">
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold text-heading-color">Forgot Your Password?</h1>
                    <p className="text-base text-pg-base">
                        Reset your password by entering your email below. We will send you an email with instructions to
                        reset your password.
                    </p>
                </div>
                <form onSubmit={handleForgetPassword} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 text-left">
                        <label className="text-md font-semibold" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full text-base px-4 py-3 border border-gray-border rounded-lg bg-background-tertiary placeholder:text-gray-medium"
                            type="email"
                            placeholder="Please enter your email"
                            name="email"
                            id="email"
                            required
                            ref={emailRef}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`flex items-center justify-center bg-base-rose hover:bg-base-rose-dark text-base-white font-semibold py-3 px-8 w-full rounded-lg transition-colors duration-600 ease-in-out cursor-pointer${
                            loading ? " opacity-60 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}>
                        {loading ? "Sending email..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
