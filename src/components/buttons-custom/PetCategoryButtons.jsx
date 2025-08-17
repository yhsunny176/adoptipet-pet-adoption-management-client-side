import React from "react";
import { petCategoryOptions } from "@/utils/pet_categories";
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

const PetCategoryButtons = ({ onCategorySelect }) => {
    return (
        <div className="py-8 w-full max-w-full overflow-hidden">
            <div className="w-full max-w-full">
                <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-3 2xl:gap-4 w-full">
                    {petCategoryOptions.map((category) => (
                        <button
                            key={category.value}
                            type="button"
                            onClick={() => onCategorySelect && onCategorySelect(category.value)}
                            className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-4 lg:p-4 xl:p-3 2xl:p-4 rounded-lg border transition-all duration-600 ease-in-out cursor-pointer border-gray-border bg-background-quaternary hover:bg-base-rose hover:scale-105 focus:outline-none focus:ring-2 focus:ring-base-rose focus:ring-opacity-50 w-full min-h-[80px] sm:min-h-[90px] md:min-h-[100px] lg:min-h-[85px] xl:min-h-[70px] 2xl:min-h-[90px] hover:*:text-base-white">
                            {iconMap[category.value] && (
                                <img
                                    src={iconMap[category.value]}
                                    alt={category.label + " icon"}
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 mb-2 flex-shrink-0 object-contain"
                                />
                            )}
                            <span className="text-center text-sm sm:text-sm md:text-base lg:text-sm xl:text-xs 2xl:text-sm text-pg-base font-bold leading-tight break-words hyphens-auto ">
                                {category.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PetCategoryButtons;
