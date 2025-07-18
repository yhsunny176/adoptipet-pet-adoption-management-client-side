import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const CheckoutForm = ({ campaignDetail, onClose, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { _id, max_amount, total_donations = 0 } = campaignDetail;

    const numAmount = Number(amount);

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                // Send amount as a number
                const { data } = await axiosSecure.post("/create-payment-intent", { _id, amount: numAmount });
                if (data && data.clientSecret) {
                    setClientSecret(data?.clientSecret);
                } else {
                    setFieldError("Failed to get client secret.");
                }
            } catch (err) {
                setFieldError(err?.response?.data?.message || err?.message || "Failed to create payment intent.");
            }
        };
        // Only fetch if _id and amount are valid
        if (_id && numAmount > 0) {
            getClientSecret();
        } else {
            setClientSecret("");
        }
    }, [axiosSecure, _id, numAmount]);

    // Timeout state for cancel window
    const [timeoutActive, setTimeoutActive] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;
        if (!amount || isNaN(amount) || numAmount <= 0) {
            setFieldError("Please enter a valid donation amount.");
            return;
        }
        // Prevent donation above max_amount
        const maxAllowed = typeof max_amount === "number" ? max_amount : Number(max_amount);
        const alreadyDonated = typeof total_donations === "number" ? total_donations : Number(total_donations);
        if (maxAllowed > 0 && numAmount + alreadyDonated > maxAllowed) {
            setFieldError(`You cannot donate more than the campaign's maximum allowed amount (Tk.${maxAllowed}).`);
            return;
        }
        if (!clientSecret) {
            setFieldError("Payment is not ready. Please try again.");
            return;
        }

        setFieldError("");
        setLoading(true);
        setTimeoutActive(true);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const id = setTimeout(async () => {
            setTimeoutActive(false);
            const card = elements.getElement(CardElement);
            if (!card) {
                setLoading(false);
                setFieldError("Card element not found.");
                return;
            }

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.name,
                        email: user?.email,
                    },
                },
            });

            setLoading(false);

            // If payment failed, show error
            if (confirmError) {
                setFieldError(confirmError.message || "Payment failed. Please check your card details.");
                return;
            }

            // If payment succeeded, show success alert
            if (paymentIntent && paymentIntent.status === "succeeded") {
                try {
                    await axiosSecure.post("/recieved-donation", {
                        campaign_id: String(campaignDetail._id),
                        amount_donated: Number(numAmount),
                        user_name: user?.displayName || "",
                        email: user?.email || "",
                        profilepic: user?.photoURL || null,
                    });
                } catch (err) {
                    toast.error(err?.response?.data?.message || err?.message || "Failed to store donation details.");
                }

                if (typeof onClose === "function") {
                    onClose();
                }
                if (typeof onSuccess === "function") {
                    onSuccess();
                }
            } else {
                setFieldError("Payment failed. Please try again.");
            }

            setTimeoutId(null);
        }, 3000);
        setTimeoutId(id);
    };

    // Cancel handler for timeout
    const handleCancelTimeout = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setTimeoutActive(false);
        setLoading(false);
        setFieldError("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto bg-base-white rounded-lg shadow-lg p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label htmlFor="donation-amount" className="font-medium text-base text-black-base">
                    Donation Amount
                </label>
                <input
                    id="donation-amount"
                    type="number"
                    min="1"
                    max={max_amount > 0 ? max_amount - total_donations : undefined}
                    step="any"
                    value={amount}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (max_amount > 0 && Number(val) + total_donations > max_amount) {
                            setFieldError(
                                `You cannot donate more than the campaign's maximum allowed amount (Tk.${max_amount}).`
                            );
                        } else {
                            setFieldError("");
                        }
                        setAmount(val);
                    }}
                    placeholder={`Enter amount (max Tk.${max_amount > 0 ? max_amount - total_donations : ""})`}
                    className="border border-card-border-prim rounded-md px-4 py-2 focus:outline-none transition"
                    required
                />
            </div>
            {fieldError && (
                <div className="text-base-rose-dark text-sm mt-1 bg-base-rose-light py-3 px-3">{fieldError}</div>
            )}
            <div className="flex flex-col gap-2">
                <label className="font-medium text-base text-black-base">Card Details</label>
                <div>
                    <CardElement />
                </div>
            </div>
            <div className={`flex flex-row gap-2 items-center ${!loading ? "" : ""}`}>
                <button
                    type="submit"
                    disabled={!stripe || loading || timeoutActive || (max_amount > 0 && total_donations >= max_amount)}
                    className={`bg-green-primary text-base-white font-semibold py-2 px-4 rounded-md shadow-md cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                        !loading ? "w-full" : ""
                    }`}>
                    {max_amount > 0 && total_donations >= max_amount ? (
                        "Donation Threshold fulfilled. No more donations needed"
                    ) : loading && !timeoutActive ? (
                        <Loader2 className="animate-spin h-5 w-5 text-base-white" />
                    ) : loading && timeoutActive ? (
                        "Waiting to process..."
                    ) : loading ? (
                        "Processing..."
                    ) : (
                        <>Pay {amount ? `Tk.${amount}` : ""}</>
                    )}
                </button>
                {timeoutActive && (
                    <button
                        type="button"
                        className="bg-base-rose text-base-white font-semibold py-2 px-4 rounded-md shadow hover:bg-base-rose-dark transition"
                        onClick={handleCancelTimeout}>
                        Cancel Payment
                    </button>
                )}
            </div>
        </form>
    );
};

export default CheckoutForm;
