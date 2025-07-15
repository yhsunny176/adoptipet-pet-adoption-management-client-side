import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const PetCard = ({ petData }) => {
    const { pet_image, pet_name, pet_age, location, pet_category, short_desc, _id } = petData || {};
    const { name, profilepic } = petData.added_by;

    return (
        <div>
            <Card className="h-full grid grid-rows-[auto_1fr]">
                <CardContent className="flex flex-col gap-4 p-4">
                    <div className="w-full max-h-64">
                        <img src={pet_image} alt="Pet image" className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className="flex items-center justify-between text-black-base">
                        <h2 className="text-3xl font-semibold text-heading-color">{pet_name}</h2>
                        <div className="flex gap-2 items-baseline">
                            <p className="text-base-pg font-semibold text-pg-base">Age:</p>
                            <p className="text-md font-bold text-base-orange">{pet_age}</p>
                        </div>
                    </div>

                    <div className="text-sm flex items-center gap-2 p-2 rounded-md bg-gray-extra-light text-gray-dark min-h-[48px]">
                        <MapPin className="w-4 h-4" />
                        <span className="break-words line-clamp-2">{location}</span>
                    </div>

                    <div className="text-sm font-medium text-base-rose">{pet_category}</div>

                    <div className="flex gap-2 items-center w-full">
                        <p className="text-sm text-base-rose">Added by:</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8">
                                <img
                                    src={profilepic}
                                    alt="image of the person who added the pet"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <span className="font-medium text-pg-base">{name}</span>
                        </div>
                    </div>

                    <div className="text-sm">
                        <p className="leading-pg-base text-gray-dark line-clamp-2">{short_desc}</p>
                    </div>

                    <CardFooter>
                        <Button asChild className="w-full py-6 bg-base-rose hover:bg-base-rose-dark text-base-white">
                            <Link to={`/pet-detail/${_id}`}>View Detail</Link>
                        </Button>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    );
};

export default PetCard;
