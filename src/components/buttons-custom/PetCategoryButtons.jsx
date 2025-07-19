import React, { useContext } from "react";
import { petCategoryOptions } from "@/utils/pet_categories";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "../buttons-custom/PetCategoryButtons.css"

import dogIcon from "@/assets/Icons/dog.png";
import catIcon from "@/assets/Icons/cat.png";
import rabbitIcon from "@/assets/Icons/rabbit.png";
import hamsterIcon from "@/assets/Icons/hamster.png";
import guineaPigIcon from "@/assets/Icons/guinea-pig.png";
import mouseIcon from "@/assets/Icons/mouse.png";
import birdIcon from "@/assets/Icons/hummingbird.png";
import fishIcon from "@/assets/Icons/clown-fish.png";
import turtleIcon from "@/assets/Icons/tortoise.png";
import lizardIcon from "@/assets/Icons/chameleon.png";
import frogIcon from "@/assets/Icons/frog.png";
import hedgehogIcon from "@/assets/Icons/hedgehog.png";
import sugarGliderIcon from "@/assets/Icons/sugar-glider.png";
import reptileIcon from "@/assets/Icons/crocodile.png";
import exoticPetIcon from "@/assets/Icons/star.png";
import otherIcon from "@/assets/Icons/paw-print.png";

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

const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
    return (
        <div className="flex items-center h-full">
            <button
                disabled={isFirstItemVisible}
                onClick={() => scrollPrev()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 mr-2 cursor-pointer"
                aria-label="Scroll Left">
                <ChevronLeft className="w-7 h-7" />
            </button>
        </div>
    );
};

const RightArrow = () => {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
    return (
        <div className="flex items-center h-full">
            <button
                disabled={isLastItemVisible}
                onClick={() => scrollNext()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-background-tertiary hover:bg-base-rose ml-2 cursor-pointer transition-colors duration-600 ease-in-out"
                aria-label="Scroll Right">
                <ChevronRight className="w-7 h-7 text-pg-base" />
            </button>
        </div>
    );
};

const PetCategoryButtons = ({ onCategorySelect }) => {
    return (
        <div className="py-8">
            <div>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} className="py-4 cursor-pointer">
                    {petCategoryOptions.map((category) => {
                        const iconSrc = iconMap[category.value];
                        return (
                            <button
                                key={category.value}
                                type="button"
                                onClick={() => onCategorySelect && onCategorySelect(category.value)}
                                className="flex flex-col items-center justify-center px-4 py-4 min-w-32 rounded-lg border transition-colors duration-600 ease-in-out whitespace-nowrap cursor-pointer border-gray-border bg-background-quaternary hover:bg-base-rose mx-2 focus:outline-none">
                                {iconSrc && (
                                    <img src={iconSrc} alt={category.label + " icon"} className="w-10 h-10 mb-2" />
                                )}
                                <span className="text-center text-md mt-2 text-pg-base font-bold">
                                    {category.label}
                                </span>
                            </button>
                        );
                    })}
                </ScrollMenu>
            </div>
        </div>
    );
};

export default PetCategoryButtons;
