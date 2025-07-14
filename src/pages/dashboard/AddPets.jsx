import AddPetForm from "@/components/forms/AddPetForm";
import React from "react";

const AddPets = () => {
    return (
        <div>
            <div className="mb-6 text-center space-y-3 md:text-left ">
                <h1 className="text-label-form text-3xl font-semibold">Add a Pet</h1>
                <p className="text-pg-base">Provide details of your pet to help them find a loving forever home.</p>
            </div>
            <AddPetForm />
        </div>
    );
};

export default AddPets;
