import React from "react";
import hamsterImg from "@/assets/Icons/pet_hamster.png";
import pugDog from "@/assets/Section Image/pug-dog.png";
import formImg from "@/assets/Icons/fill-up.png";
import donationImg from "@/assets/Icons/donation.png";
import dashboardImg from "@/assets/Icons/layout.png";

const AboutUs = () => {
    return (
        <div className="w-full">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-center max-w-11/12 lg:max-w-10/12 xl:max-w-9/12 mx-auto">
                <div className="w-[500px] md:w-2xs h-full sm:h-80 md:h-[400px] flex-shrink-0 flex items-center justify-center">
                    <img src={pugDog} alt="It is a pug dog" className="w-full h-full object-cover rounded-xl" />
                </div>

                <div className="md:col-start-2 md:col-span-full pt-6 md:pt-10 w-full flex flex-col items-center md:items-start">
                    <div className="grid gap-5 w-full">
                        <div className="mb-6 space-y-4 w-full">
                            <h2 className="text-3xl sm:text-4xl font-bold text-heading-color text-center lg:text-left">
                                About Us
                            </h2>
                            <p className="text-base sm:text-lg text-gray-dark text-center lg:text-left">
                                AdoptiPet is a compassionate platform built to connect loving families with pets in need
                                of a home. Our mission is to make pet adoption easy, transparent, and joyful for
                                everyone, while also supporting animal welfare through donation campaigns and community
                                engagement.
                            </p>
                        </div>

                        <div className="space-y-4 w-full">
                            <h3 className="text-2xl md:text-2xl font-bold text-heading-color text-center lg:text-left">
                                Why AdoptiPet Was Made?
                            </h3>
                            <p className="text-base sm:text-base text-gray-dark text-center lg:text-left">
                                AdoptiPet was created out of a passion for animal welfare and a desire to make adoption
                                accessible to everyone. Too many pets wait in shelters for a loving home, and we believe
                                every animal deserves a second chance. By combining technology with compassion, we aim
                                to:
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 max-w-11/12 lg:max-w-full mx-auto">
                <h3 className="text-3xl sm:text-4xl font-semibold text-center text-heading-color mb-8 sm:mb-10 pt-10 sm:pt-16">
                    How the Website Works
                </h3>
                <div className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-2 xl:grid-cols-4 sm:gap-6 auto-rows-fr max-w-11/12 mx-auto">
                    {/* Card 1 */}
                    <div className="bg-background-secondary border border-base-rose px-5 py-8 rounded-xl flex flex-col items-center gap-4 cursor-pointer hover:bg-base-rose-light w-full h-full">
                        <div className="w-20 h-20 sm:w-24 sm:h-24">
                            <img
                                src={hamsterImg}
                                alt="This is a pet animal icon"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-bold text-xl sm:text-2xl text-base-rose text-center">
                                Browse Pet Listings
                            </h3>
                            <p className="text-center leading-pg-base line-clamp-3 text-sm sm:text-base">
                                Discover a wide variety of pets available for adoption. Each listing provides detailed
                                information of pets.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-background-secondary border border-base-rose px-5 py-8 rounded-xl flex flex-col items-center gap-4 cursor-pointer hover:bg-base-rose-light w-full h-full">
                        <div className="w-20 h-20 sm:w-24 sm:h-24">
                            <img src={formImg} alt="This is a form icon" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-bold text-xl sm:text-2xl text-base-rose text-center">Adopt a Pet</h3>
                            <p className="text-center leading-pg-base text-sm sm:text-base">
                                Submit adoption requests directly through the website. Our process ensures responsible
                                adoption and a smooth experience for both adopters and pets.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-background-secondary border border-base-rose px-5 py-8 rounded-xl flex flex-col items-center gap-4 cursor-pointer hover:bg-base-rose-light w-full h-full">
                        <div className="w-20 h-20 sm:w-24 sm:h-24">
                            <img
                                src={donationImg}
                                alt="This is a donation icon"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-bold text-xl sm:text-2xl text-base-rose text-center">
                                Donation Campaigns
                            </h3>
                            <p className="text-center leading-pg-base text-sm sm:text-base">
                                Support animal welfare by participating in donation campaigns. Your contributions help
                                provide food, shelter, and medical care for pets in need.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-background-secondary border border-base-rose px-5 py-8 rounded-xl flex flex-col items-center gap-4 cursor-pointer hover:bg-base-rose-light w-full h-full">
                        <div className="w-20 h-20 sm:w-24 sm:h-24">
                            <img
                                src={dashboardImg}
                                alt="This is a layout icon"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-bold text-xl sm:text-2xl text-base-rose text-center">
                                Dashboard Features
                            </h3>
                            <p className="text-center leading-pg-base text-sm sm:text-base">
                                Registered users can manage their adoption requests, track donations, add new pets for
                                adoption, and view campaign progress—all from a personalized dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
