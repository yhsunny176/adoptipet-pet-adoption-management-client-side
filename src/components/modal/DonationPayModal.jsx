import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import AdoptForm from "../forms/AdoptForm";

import { XIcon } from "lucide-react";

const DonationPayModal = ({ open, onOpenChange, trigger, title = "Adopt Pet" }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent
                className="max-w-10/12 sm:max-w-xl w-full p-0 bg-base-white"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}>
                <div className="relative flex flex-col h-full min-h-[80vh]">
                    <div className="flex flex-row items-center justify-between px-4 pt-4">
                        <DialogTitle>{title}</DialogTitle>
                        <DialogClose asChild>
                            <button
                                aria-label="Close"
                                className="rounded-full p-2 cursor-pointer transition-colors duration-500 ease-in-out hover:bg-gray-extra-light focus:outline-none"
                                style={{ lineHeight: 1 }}>
                                <XIcon className="w-6 h-6" />
                            </button>
                        </DialogClose>
                    </div>
                    <div className="flex-1 flex flex-col px-0 pb-0">
                        <div className="flex-1 flex flex-col justify-center h-full w-full">
                            <AdoptForm />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DonationPayModal;
