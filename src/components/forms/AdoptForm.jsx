import useAuth from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Field, Formik, Form } from "formik";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";

// Validation schema
const validationSchema = Yup.object({
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{11}$/, "Phone number must be exactly 11 digits"),
    address: Yup.string().required("Address is required"),
});

const AdoptForm = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [alreadyRequested, setAlreadyRequested] = useState(false);
    const [ownPet, setOwnPet] = useState(false);
    const axiosSecure = useAxiosSecure();

    // Fetch pet data
    const {
        data: petInfo,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["pet-detail", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/pet-detail/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    // Check if already requested
    useEffect(() => {
        const checkAlreadyRequested = async () => {
            if (!user?.email || !id) return;
            try {
                const res = await axiosSecure.get(`/adopt-request/check`, {
                    params: { pet_id: id, user_email: user.email },
                });
                setAlreadyRequested(res.data?.alreadyRequested === true);
                setOwnPet(res.data?.ownPet === true);
            } catch {
                setAlreadyRequested(false);
                setOwnPet(false);
            }
        };
        checkAlreadyRequested();
    }, [user?.email, id, axiosSecure]);

    if (isLoading) {
        return <div className="text-center py-10">Loading pet information...</div>;
    }
    if (isError || !petInfo) {
        return toast.error("Failed to load pet information.");
    }

    const { name, email } = petInfo.added_by;

    return (
        <div>
            <div className="grid grid-cols-1 auto-rows-max gap-4">
                <Formik
                    initialValues={{
                        phone: "",
                        address: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const adoptionRequest = {
                                pet_id: petInfo._id,
                                pet_name: petInfo.pet_name,
                                pet_image: petInfo.pet_image,
                                user_name: user?.displayName,
                                user_email: user?.email,
                                phone: values.phone,
                                address: values.address,
                                added_by: {
                                    name: name,
                                    email: email,
                                },
                            };

                            await axiosSecure.post(`/adopt-request`, adoptionRequest);

                            setAlreadyRequested(true);

                            // Close modal first, then show SweetAlert after a short delay
                            const evt = new CustomEvent("close-modal");
                            window.dispatchEvent(evt);
                            setTimeout(() => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Adoption Request Submitted!",
                                    html: `Thank you for your interest in adopting <b>${petInfo.pet_name}</b>.<br>We will contact you soon.`,
                                    confirmButtonText: "OK",
                                    customClass: {
                                        title: "swal-title-custom-font",
                                    },
                                });
                            }, 300);

                            resetForm();
                        } catch (error) {
                            Swal.fire({
                                icon: "error",
                                title: "Submission Failed",
                                text: error.message || "Failed to submit adoption request. Please try again!",
                            });
                        } finally {
                            setSubmitting(false);
                        }
                    }}>
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-6 max-w-full p-8 rounded-lg shadow">
                            {/* Pet Info */}
                            <div className="mb-4">
                                <div className="flex flex-wrap items-center gap-4 min-w-0">
                                    {petInfo.pet_image && (
                                        <img
                                            src={petInfo.pet_image}
                                            alt={petInfo.pet_name}
                                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg flex-shrink-0"
                                        />
                                    )}
                                    <div className="space-y-2 min-w-0 flex-1">
                                        <div className="font-bold font-pg text-2xl break-words truncate max-w-full">
                                            {petInfo.pet_name}
                                        </div>
                                        <div className="text-gray-medium font-pg text-xs sm:text-md break-words truncate max-w-full overflow-x-auto">
                                            <span className="text-red-base">Pet ID:</span> {petInfo._id}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User Name disabled */}
                            <div>
                                <label htmlFor="userName" className="block text-sm font-medium text-black-base mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    value={user?.displayName || ""}
                                    disabled
                                    className="w-full px-4 py-3 border border-gray-border bg-gray-100 rounded-lg"
                                />
                            </div>

                            {/* User Email disabled */}
                            <div>
                                <label htmlFor="userEmail" className="block text-sm font-medium text-black-base mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="userEmail"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full px-4 py-3 border border-gray-border bg-gray-100 rounded-lg"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-black-base mb-2">
                                    Phone Number
                                </label>
                                <Field
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    className={`w-full px-4 py-3 border rounded-lg ${
                                        errors.phone && touched.phone
                                            ? "border-red-base bg-red-light"
                                            : "border-gray-border bg-base-white"
                                    }`}
                                    disabled={ownPet}
                                />
                                {errors.phone && touched.phone && (
                                    <div className="text-red-medium font-bold text-sm mt-1">{errors.phone}</div>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-black-base mb-2">
                                    Address
                                </label>
                                <Field
                                    as="textarea"
                                    name="address"
                                    id="address"
                                    rows={3}
                                    placeholder="Enter your address"
                                    className={`w-full px-4 py-3 border border-gray-border rounded-lg resize-none ${
                                        errors.address && touched.address
                                            ? "border-red-base bg-red-light"
                                            : "border-gray-border bg-base-white"
                                    }`}
                                    disabled={ownPet}
                                />
                                {errors.address && touched.address && (
                                    <div className="text-red-medium font-bold text-sm mt-1">{errors.address}</div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className={`w-full font-semibold py-4 px-8 rounded-lg transition-colors duration-700 ease-in-out text-base-white
                                        ${
                                            ownPet
                                                ? "bg-gray-light cursor-not-allowed text-gray-medium"
                                                : isSubmitting || alreadyRequested
                                                ? "bg-base-rose-light cursor-not-allowed"
                                                : "bg-base-rose hover:bg-base-rose-dark cursor-pointer"
                                        }
                                    `}
                                    disabled={isSubmitting || alreadyRequested || ownPet}>
                                    {ownPet
                                        ? "You can't request adoption for your own pet"
                                        : alreadyRequested
                                        ? "Request Already Sent"
                                        : isSubmitting
                                        ? "Submitting"
                                        : "Submit Adoption Request"}
                                </button>
                                {ownPet && (
                                    <div className="text-base-rose font-bold text-center mt-2">
                                        You cannot request adoption for a pet you have added.
                                    </div>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdoptForm;
