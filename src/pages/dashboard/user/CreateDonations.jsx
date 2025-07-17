import CreateDonationsForm from "@/components/forms/CreateDonationsForm";
import React from "react";

const CreateDonations = () => {
    return (
        <div>
            <div className="mb-6 text-center space-y-3 md:text-left ">
                <h1 className="text-label-form text-3xl font-semibold">Create Donation Campaign - Give Them Hope</h1>
                <p className="text-pg-base">Start a life-changing journey for a pet in need. Your support can make all the difference. </p>
            </div>
            <CreateDonationsForm />
        </div>
    );
};

export default CreateDonations;
