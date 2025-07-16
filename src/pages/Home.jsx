import Banner from "@/components/banner/Banner";
import PetCategoryButtons from "@/components/PetCategoryButtons";
import React, { useState } from "react";
import { useNavigate } from "react-router";


const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        navigate(`/category-pets/${category}`);
    };

    return (
        <div>
            <Banner />
            <div className="py-8 flex justify-center bg-background-tertiary">
                <div className="max-w-11/12 w-full overflow-x-auto scrollbar-hide">
                    <PetCategoryButtons
                        onCategorySelect={handleCategorySelect}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
