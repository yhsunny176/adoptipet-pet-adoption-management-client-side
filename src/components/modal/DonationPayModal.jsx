import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";

import { XIcon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../forms/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const DonationPayModal = ({ open, onOpenChange, trigger, campaignDetail }) => {
    const { pet_name } = campaignDetail;

    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent
                className="bg-black/90 p-8 rounded-lg shadow-xl w-auto max-w-full flex flex-col items-center justify-center"
                style={{ boxSizing: "border-box" }}
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-6 items-center justify-center">
                    <div className="flex flex-row items-center justify-between w-full mb-2">
                        <DialogTitle className="text-base-white text-lg font-bold">
                            Checkout Form - Donation for {pet_name}
                        </DialogTitle>
                        <DialogClose asChild>
                            <button
                                aria-label="Close"
                                className="rounded-full p-2 cursor-pointer transition-colors duration-500 ease-in-out hover:bg-black-base focus:outline-none"
                                style={{ lineHeight: 1 }}>
                                <XIcon className="w-6 h-6 text-base-white" />
                            </button>
                        </DialogClose>
                    </div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            campaignDetail={campaignDetail}
                            onClose={async () => {
                                // Close modal first
                                if (typeof onOpenChange === "function") {
                                    onOpenChange(false);
                                }
                                // Wait for modal to close, then show SweetAlert
                                await new Promise((resolve) => setTimeout(resolve, 300));
                                const Swal = (await import("sweetalert2")).default;
                                Swal.fire({
                                    icon: "success",
                                    title: "Thank you!",
                                    text: "Your donation was successful.",
                                });
                            }}
                        />
                    </Elements>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DonationPayModal;
