import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import DonorLists from "../card/DonorLists";

const DonatorsModal = ({ open, onOpenChange, trigger, title = "", donors, donorsLoading, donorsError }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent
                className="max-w-10/12 sm:max-w-xl w-full p-0 bg-background-quaternary px-8"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}>
                <div className="relative flex flex-col h-full min-h-[80vh]">
                    <div className="flex flex-row items-center justify-between pt-4">
                        <DialogTitle className={"my-6 text-2xl text-heading-color"}>{title}</DialogTitle>
                        <DialogClose asChild>
                            <button
                                aria-label="Close"
                                className="rounded-full p-2 cursor-pointer transition-colors duration-500 ease-in-out hover:bg-gray-medium hover:text-base-rose focus:outline-none"
                                style={{ lineHeight: 1 }}>
                                <XIcon className="w-6 h-6 text-pg-base" />
                            </button>
                        </DialogClose>
                    </div>
                    <div className="flex-1 flex flex-col px-0 pb-0">
                        <div className="flex-1 flex flex-col h-full w-full">
                            <DonorLists donors={donors} isLoading={donorsLoading} isError={donorsError} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DonatorsModal;
