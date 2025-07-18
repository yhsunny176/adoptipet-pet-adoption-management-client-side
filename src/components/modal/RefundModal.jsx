import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";

const RefundModal = ({ closeModal, isOpen, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="w-full max-w-md bg-base-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle asChild>
                        <h3 className="font-medium text-3xl text-center leading-12 text-heading-color">
                            Are you sure you want to Refund the donation you have done?
                        </h3>
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-2">
                    <p className="text-md text-xl py-4 px-4 rounded-lg max-w-max mx-auto text-center bg-base-rose-light text-base-rose">
                        You cannot undo once it&apos;s done!
                    </p>
                </div>
                <hr className="mt-8 text-gray-light" />
                <div className="flex mt-2 items-center justify-center gap-4">
                    <Button
                        size={"lg"}
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-extra-light px-4 py-6 text-md font-medium text-black-base hover:bg-base-rose hover:text-base-white focus:outline-none focus-visible:ring-2 focus-visible:ring-base-rose focus-visible:ring-offset-2"
                        onClick={onConfirm}>
                        Yes, I want to Refund
                    </Button>
                    <Button
                        size={"lg"}
                        className="inline-flex justify-center rounded-md bg-blue-regular px-12 py-6 text-md font-medium text-base-white hover:shadow-sm hover:text-base-white focus:outline-none focus-visible:ring-2 focus-visible:ring-base-rose focus-visible:ring-offset-2"
                        onClick={closeModal}>
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RefundModal;
