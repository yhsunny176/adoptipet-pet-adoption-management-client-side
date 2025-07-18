import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router";

const DonationCampCards = ({ donations }) => {
    const { pet_image, pet_name, max_amount, short_desc, _id } = donations || {};

    return (
        <div>
            <Card className="h-full flex flex-col">
                <CardContent className="flex flex-col gap-4 p-4 flex-1">
                    <div className="w-full max-h-64">
                        <img src={pet_image} alt="Pet image" className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div>
                        <div className="space-y-5">
                            <h2 className="text-3xl font-semibold text-heading-color">{pet_name}</h2>

                            <div className="flex flex-col font-medium text-base-rose gap-2">
                                <p className="font-semibold">Max Donation Limit:</p>
                                <p className="text-green-primary text-2xl font-bold">Tk. {max_amount}</p>
                            </div>

                            <div className="text-sm">
                                <p className="leading-pg-base text-gray-dark line-clamp-2">{short_desc}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="mt-auto px-4 mb-6">
                    <Button asChild className="w-full py-6 bg-base-rose hover:bg-base-rose-dark text-base-white">
                        <Link to={`/donation-detail/${_id}`}>View Detail</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default DonationCampCards;
