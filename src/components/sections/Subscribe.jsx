import { useTheme } from "@/hooks/useTheme";
import React from "react";

const Subscribe = () => {
    const { theme } = useTheme();

    return (
        <div className="flex-1 w-full max-w-11/12 lg:max-w-10/12 xl:max-w-9/12 mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
                <div className="space-y-6 w-full md:w-1/2 text-center md:text-left">
                    <h1
                        className={
                            theme === "light"
                                ? "text-3xl sm:text-4xl text-pg-black font-bold"
                                : "text-3xl sm:text-4xl font-bold text-base-rose"
                        }>
                        Join our Newsletter Today
                    </h1>
                    <p className="text-pg-base text-base sm:text-lg">
                        To Get Notified About the Latest Adoption postings, and Pet Care blogs, news etc. Join our
                        Newsletter
                    </p>
                </div>

                <form className="mt-8 md:mt-0 flex flex-col sm:flex-row items-center gap-4 w-full md:w-1/2 max-w-xl mx-auto md:mx-0">
                    <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-3 rounded-md border border-gray-medium focus:outline-none text-base text-pg-black bg-base-white min-w-0 w-full"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-md bg-base-rose text-base-white font-semibold text-base hover:bg-base-rose-dark transition-colors duration-500 ease-in-out w-full sm:w-auto">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Subscribe;
