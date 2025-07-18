import Lottie from "lottie-react";
import React from "react";
import errorAnimation from "@/assets/animation/error-animation.json";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 items-center justify-center py-32">
            <div className="max-w-10/12 sm:max-w-8/12 md:max-w-7/12 lg:max-w-6/12 mx-auto">
                <Lottie animationData={errorAnimation} />
            </div>

            <div className="max-w-10/12 mx-auto py-12">
                <h1 className="mt-3 text-2xl font-semibold text-heading-color text-center sm:text-3xl lg:text-4xl">
                    Ooops! We're very sorry. Something Went Wrong!
                </h1>
                <p className="mt-4 text-pg-base text-xl text-center">Here are some helpful links:</p>

                <div className="flex items-center justify-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                    {/* Go back */}
                    <Button
                        onClick={() => navigate(-1)}
                        variant="sm"
                        className="bg-green-primary text-base-white text-xl py-6 px-6">
                        <span>
                            <ChevronLeft size={24} />
                        </span>
                        Go Back
                    </Button>

                    {/* Go to Home */}
                    <Button
                        onClick={() => navigate("/")}
                        variant="sm"
                        className="bg-base-rose-light border border-base-rose text-base-rose hover:bg-base-rose hover:text-base-white text-xl py-6 px-6 transition-colors duration-500 ease-in-out">
                        <span>
                            <ChevronLeft size={24} />
                        </span>
                        Meow to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Error;
