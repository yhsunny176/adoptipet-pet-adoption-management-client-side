import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Heart, Shield, Stethoscope, Home } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const PetCareTips = () => {
    const { theme } = useTheme();

    const tips = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Love & Attention",
            description: "Spend quality time with your pet daily. Regular interaction builds trust and strengthens your bond, making them feel secure and loved in their new home."
        },
        {
            icon: <Stethoscope className="w-8 h-8" />,
            title: "Regular Health Checkups",
            description: "Schedule routine veterinary visits to ensure your pet stays healthy. Early detection of health issues can prevent serious problems and extend their lifespan."
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Proper Nutrition",
            description: "Feed your pet high-quality food appropriate for their age, size, and breed. Proper nutrition is the foundation of good health and vitality."
        },
        {
            icon: <Home className="w-8 h-8" />,
            title: "Safe Environment",
            description: "Create a pet-friendly home by removing hazards and providing comfortable spaces. A safe environment helps your pet feel secure and prevents accidents."
        }
    ];

    return (
        <div className="w-full main-container">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-heading-color mb-4">
                    Essential Pet Care Tips
                </h2>
                <p className="text-base sm:text-lg text-pg-base max-w-3xl mx-auto">
                    Caring for your new companion is a rewarding journey. Here are some essential tips to help you provide the best care for your adopted pet.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className="bg-background-secondary border border-base-rose rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-base-rose-dark"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-base-rose/10 rounded-full text-base-rose">
                                {tip.icon}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-heading-color mb-3">
                            {tip.title}
                        </h3>
                        <p className="text-sm text-pg-base leading-relaxed">
                            {tip.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <p className="text-lg text-pg-base mb-6">
                    Need more guidance on pet care? Our community is here to help!
                </p>
                <Button
                    asChild
                    className={
                        theme === "light"
                            ? "bg-base-rose text-base-white py-6 px-8 text-lg hover:bg-base-rose-dark transition-colors duration-500 ease-in-out"
                            : "bg-base-rose text-base-white py-6 px-8 text-lg hover:bg-base-rose-dark transition-colors duration-500 ease-in-out"
                    }
                >
                    <Link to="/pet-listing">Find Your Perfect Pet</Link>
                </Button>
            </div>
        </div>
    );
};

export default PetCareTips;