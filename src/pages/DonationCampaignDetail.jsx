import EmptyState from "@/components/EmptyState";
import SinglePetSkeleton from "@/components/loader/Skeletons/SinglePetSkeleton";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import DonationPayModal from "@/components/modal/DonationPayModal";
import { useTheme } from "@/hooks/useTheme";

const DonationCampaignDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    const { data: campaignDetail, isLoading } = useQuery({
        queryKey: ["campaignDetail", id],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/donation-detail/${id}`);
            return data;
        },
    });

    // Listen for custom close-modal event from AdoptForm
    useEffect(() => {
        const handleCloseModal = () => {
            setIsOpen(false);
        };
        window.addEventListener("close-modal", handleCloseModal);
        return () => {
            window.removeEventListener("close-modal", handleCloseModal);
        };
    }, []);

    if (isLoading) {
        return <SinglePetSkeleton />;
    }

    if (!campaignDetail || typeof campaignDetail !== "object") {
        return (
            <div>
                <EmptyState />
            </div>
        );
    }

    const { pet_image, pet_name, max_amount, last_don_date, short_desc, long_desc, added_by } = campaignDetail || {};
    // Format last donation date
    let formattedLastDonDate = last_don_date;
    if (last_don_date) {
        const dateObj = new Date(last_don_date);
        formattedLastDonDate = dateObj.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    // SweetAlert for Login warning before adoption request
    const handleDonate = async (open) => {
        if (!user) {
            const Swal = (await import("sweetalert2")).default;
            Swal.fire({
                icon: "info",
                title: "Login Required",
                text: "Please log in to adopt a pet.",
                confirmButtonText: "OK",
            });
            return;
        }
        setIsOpen(open);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-primary">
            <Navbar />

            <div className="space-y-4 w-full max-w-11/12 mx-auto pt-8 pb-2 px-2 flex flex-col items-center text-center xl:text-left xl:flex-col xl:items-start sm:px-4 md:px-8">
                <h1 className="text-2xl sm:text-3xl xl:text-4xl font-medium text-heading-color">Campaign Details</h1>
                <p className="text-pg-base mb-6">
                    Here you'll find the details about the donation campaign so that you can donate safely with us.
                    Carefully check Campaign details below before donation.
                </p>
            </div>
            <div className="w-full max-w-11/12 mx-auto flex flex-1 py-6 px-2 sm:px-4 md:px-8">
                <div className="grid grid-cols-1 xl:grid-cols-8 gap-6 xl:gap-16 w-full">
                    {/* Image */}
                    <div className="w-full h-96 xl:h-full xl:col-span-3 rounded-2xl border border-base-rose flex items-center justify-center overflow-hidden">
                        <img
                            src={pet_image}
                            alt={`Image of the pet ${pet_name}`}
                            className="w-full h-full object-cover rounded-2xl shadow-card-primary"
                        />
                    </div>

                    {/* Right side contents */}
                    <div className="xl:col-span-5 flex flex-col gap-6">
                        {/* Basic Info */}
                        <div className="flex flex-wrap items-center justify-between gap-2 max-w-full sm:gap-6 md:gap-12 px-6 sm:px-4 md:px-8 xl:flex-row xl:max-w-max rounded-xl py-4 border border-gray-light w-full overflow-x-auto">
                            <div className="flex gap-3 xl:flex-col items-center mx-auto xl:mx-0 lg:gap-1">
                                <h1
                                    className={
                                        theme === "light"
                                            ? "text-pg-base font-bold text-xl xl:mb-3"
                                            : "text-base-orange font-bold text-xl  xl:mb-3"
                                    }>
                                    Pet Name:
                                </h1>
                                <p className="text-2xl mt-1 sm:text-3xl font-bold text-base-rose">{pet_name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 lg:gap-8 xl:gap-12">
                            {/* Maximum Donation Amount*/}
                            <div>
                                <div
                                    className={
                                        theme === "light"
                                            ? "flex flex-col gap-2 bg-background-quaternary rounded-xl"
                                            : "flex flex-col gap-2 bg-background-quaternary py-4 px-4 sm:py-6 md:px-8 rounded-xl"
                                    }>
                                    <h1
                                        className={
                                            theme === "light"
                                                ? "text-lg lg:text-xl text-pg-base font-bold mt-1"
                                                : "text-base-rose text-lg lg:text-xl font-bold mt-1"
                                        }>
                                        Maximum Donation Amount Limit:
                                    </h1>
                                    <p className="text-lg sm:text-xl md:text-4xl font-bold text-green-primary mt-1">
                                        {max_amount}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={
                                    theme === "light"
                                        ? "border-r-2 border-r-gray-light h-24"
                                        : "border-r-2 border-r-base-rose h-24"
                                }></div>

                            {/* Last Donation Date */}
                            <div>
                                <div className="flex flex-col gap-2 bg-background-quaternary py-4 sm:py-6 sm:px-6 rounded-xl">
                                    <h1
                                        className={
                                            theme === "light"
                                                ? "text-lg lg:text-xl text-pg-base font-bold mt-1"
                                                : "text-lg lg:text-xl text-base-rose font-bold mt-1"
                                        }>
                                        Last Donation Date:
                                    </h1>
                                    <p className="text-lg sm:text-xl md:text-3xl font-bold text-pg-base mt-1">
                                        {formattedLastDonDate}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Short Description */}
                        <div>
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <h1
                                    className={
                                        theme === "light"
                                            ? "text-xl text-pg-base font-bold mt-1"
                                            : "text-xl text-base-orange"
                                    }>
                                    Short Introduction of {pet_name}:
                                </h1>
                                <p className="text-md font-md text-pg-base mt-1">{short_desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Line */}
                    <div className="col-span-full border-t-1 my-4 border-t-base-rose"></div>

                    {/* Full description */}
                    <div className="col-span-full auto-rows-auto space-y-4 md:space-y-8">
                        <h1 className="text-md text-heading-color font-bold text-2xl md:text-3xl mt-1">
                            Full Description about {pet_name}:
                        </h1>
                        <div
                            className="pet-description text-pg-base max-w-none leading-7 space-y-2 md:space-y-4"
                            dangerouslySetInnerHTML={{ __html: long_desc }}
                        />
                    </div>

                    {/* horizontal line */}
                    <div className="col-span-full border-t-1 my-4 border-t-base-rose"></div>

                    {/* Added by (user who added the pet) */}
                    <div className="col-span-full">
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-4 sm:space-y-0">
                            <p className="text-gray-dark"> Pet Added by:</p>
                            <div className="flex flex-row items-center space-x-3">
                                <div className="w-14 h-14 sm:w-16 sm:h-16">
                                    <img
                                        src={added_by.profilepic}
                                        className="w-full h-full rounded-full object-cover"
                                        alt="user image of who added the pet"
                                    />
                                </div>
                                <p className="text-lg sm:text-2xl text-base-rose-dark font-semibold">{added_by.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Adopt button */}
                    <div className="col-span-full flex flex-col items-stretch">
                        <DonationPayModal
                            open={isOpen}
                            onOpenChange={handleDonate}
                            trigger={
                                <Button
                                    variant="lg"
                                    className={
                                        "bg-base-rose hover:bg-base-rose-dark text-base-white py-6 px-6 cursor-pointer w-full max-w-full transition-colors duration-600 ease-in-out"
                                    }>
                                    Donate to Campaign
                                </Button>
                            }
                            title={`Adopt ${pet_name}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationCampaignDetail;
