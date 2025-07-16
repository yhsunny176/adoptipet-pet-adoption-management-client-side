import React, { useRef } from "react";
import { petCategoryOptions } from "@/utils/pet_categories";

import dogIcon from "../assets/Icons/dog.png";
import catIcon from "../assets/Icons/cat.png";
import rabbitIcon from "../assets/Icons/rabbit.png";
import hamsterIcon from "../assets/Icons/hamster.png";
import guineaPigIcon from "../assets/Icons/guinea-pig.png";
import mouseIcon from "../assets/Icons/mouse.png";
import birdIcon from "../assets/Icons/hummingbird.png";
import fishIcon from "../assets/Icons/clown-fish.png";
import turtleIcon from "../assets/Icons/tortoise.png";
import lizardIcon from "../assets/Icons/chameleon.png";
import frogIcon from "../assets/Icons/frog.png";
import hedgehogIcon from "../assets/Icons/hedgehog.png";
import sugarGliderIcon from "../assets/Icons/sugar-glider.png";
import reptileIcon from "../assets/Icons/crocodile.png";
import exoticPetIcon from "../assets/Icons/star.png";
import otherIcon from "../assets/Icons/paw-print.png";

const iconMap = {
    dog: dogIcon,
    cat: catIcon,
    rabbit: rabbitIcon,
    hamster: hamsterIcon,
    guinea_pig: guineaPigIcon,
    mouse: mouseIcon,
    bird: birdIcon,
    fish: fishIcon,
    turtle: turtleIcon,
    lizard: lizardIcon,
    frog: frogIcon,
    hedgehog: hedgehogIcon,
    sugar_glider: sugarGliderIcon,
    reptile: reptileIcon,
    exotic_pet: exoticPetIcon,
    other: otherIcon,
};

const PetCategoryButtons = ({ onCategorySelect }) => {
    const containerRef = useRef(null);

    // Enable horizontal scroll with mouse wheel
    const handleWheel = (e) => {
        if (containerRef.current && e.deltaY !== 0) {
            e.preventDefault();
            containerRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <div className="py-12">
            <div className="space-y-6">
                <h2 className="text-4xl font-bold text-center text-heading-color">Explore Pet Categories</h2>
                <p className="text-center text-base text-pg-base mb-4">
                    Find your perfect companion by browsing different pet categories available for adoption.
                </p>
            </div>
            <div
                ref={containerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide py-4"
                onWheel={handleWheel}
                style={{ WebkitOverflowScrolling: "touch" }}>
                {petCategoryOptions.map((category) => {
                    const iconSrc = iconMap[category.value];
                    return (
                        <button
                            key={category.value}
                            type="button"
                            onClick={() => onCategorySelect && onCategorySelect(category.value)}
                            className={`flex flex-col items-center justify-center px-4 py-4 min-w-32 rounded-lg border transition-colors duration-700 whitespace-nowrap cursor-pointer border-gray-border bg-background-quaternary hover:bg-base-rose`}>
                            {iconSrc && <img src={iconSrc} alt={category.label + " icon"} className="w-10 h-10 mb-2" />}
                            <span className="text-center text-md mt-2 text-pg-base font-bold">{category.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PetCategoryButtons;
