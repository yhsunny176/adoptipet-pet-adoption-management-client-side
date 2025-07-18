import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import TiptapEditor from "../long-text-editor/TipTapEditor";
import ImageField from "../photo-upload-field/ImageField";
import useAuth from "@/hooks/useAuth";
import DateField from "../datefield/DateField";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const validationSchema = Yup.object({
    photoFile: Yup.mixed()
        .required("Image required")
        .test("fileSize", "File size must be less than 5MB", (value) => {
            if (!value) return false;
            return value.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Only Images are required", (value) => {
            if (!value) return false;
            return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(value.type);
        }),
    petName: Yup.string().required("Pet Name is required"),
    maxAmount: Yup.number()
        .typeError("Maximum Amount must be a number")
        .required("Maximum Amount is required")
        .positive("Maximum Amount must be greater than zero")
        .min(1, "Maximum Amount must be at least 1"),
    lastDateDon: Yup.string().required("Pet age is required"),
    shortDesc: Yup.string().required("Short Description is required"),
    longDesc: Yup.string().required("Long description is required"),
});

const CreateDonationsForm = () => {
    const [cancelled, setCancelled] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    return (
        <div className="bg-background-tertiary w-full">
            <div className="w-full max-w-full mx-auto bg-background-tertiary backdrop-blur-sm rounded-2xl p-8 border border-gray-border shadow-card-primary">
                <Formik
                    initialValues={{
                        photoURL: "",
                        photoFile: null,
                        petName: "",
                        maxAmount: "",
                        lastDateDon: "",
                        shortDesc: "",
                        longDesc: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        if (cancelled) {
                            setSubmitting(false);
                            setCancelled(false);
                            return;
                        }

                        try {
                            const petData = {
                                max_amount: values?.maxAmount,
                                pet_name: values?.petName,
                                pet_image: values?.photoURL,
                                last_don_date: values?.lastDateDon,
                                short_desc: values?.shortDesc,
                                long_desc: values?.longDesc,
                                added_by: {
                                    name: user?.displayName,
                                    profilepic: user?.photoURL,
                                    email: user?.email,
                                },
                            };

                            await axiosSecure.post(`/dashboard/create-donation-campaign`, petData);

                            const result = await Swal.fire({
                                icon: "success",
                                title: `You have created a new Donation Campaign for ${petData.pet_name} Successfully!`,
                                showCancelButton: true,
                                confirmButtonText: "See My Donation Campaigns",
                                cancelButtonText: "Create Another Campaign",
                                customClass: {
                                    title: "swal-title-custom-font",
                                },
                            });
                            if (result.isConfirmed) {
                                window.location.href = `/dashboard/my-donation-campaigns/${user?.email}`;
                            } else {
                                resetForm();
                            }
                        } catch (error) {
                            toast.error(error.message || "Failed Creating a Donation Campaign. Please Try Again!");
                        } finally {
                            setSubmitting(false);
                        }
                    }}>
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="pet-add-form space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:auto-rows-max gap-8">
                                {/* Photo Upload */}
                                <ImageField nameFile="photoFile" nameURL="photoURL" label="Pet Photo" />

                                {/* Basic Pet Info */}

                                {/* Pet Name */}
                                <div className="space-y-6 py-8">
                                    <div>
                                        <label
                                            htmlFor="petName"
                                            className="block text-sm font-medium text-black-base mb-2">
                                            Pet Name
                                        </label>
                                        <Field
                                            type="text"
                                            name="petName"
                                            id="petName"
                                            placeholder="Enter the pet name"
                                            className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-base-orange rounded-lg transition-all duration-200 ${
                                                errors.petName && touched.petName
                                                    ? "border-red-base bg-red-light"
                                                    : "border-gray-border bg-base-white"
                                            }`}
                                        />
                                        {errors.petName && touched.petName && (
                                            <div className="text-red-medium font-bold text-sm mt-1">
                                                {errors.petName}
                                            </div>
                                        )}
                                    </div>

                                    {/* Maximum Donation Amount */}
                                    <div className="relative">
                                        <label
                                            htmlFor="maxAmount"
                                            className="block text-sm font-medium text-black-base mb-2">
                                            Maximum Donation Amount
                                        </label>
                                        <div className="relative flex items-center">
                                            <Field
                                                type="number"
                                                name="maxAmount"
                                                id="maxAmount"
                                                min={1}
                                                placeholder="Enter the maximum donation amount people can donate..."
                                                className={`w-full pl-5 py-3 pr-24 border border-gray-border focus:outline-0 focus:border-base-orange rounded-lg transition-all duration-200 ${
                                                    errors.maxAmount && touched.maxAmount
                                                        ? "border-red-base bg-red-light"
                                                        : "border-gray-border bg-base-white"
                                                }`}
                                            />
                                            <span className="absolute right-3 mt-0.5 inset-y-0 flex items-center h-full text-lg text-gray-dark pointer-events-none select-none">
                                                <p>৳(Taka)</p>
                                            </span>
                                        </div>
                                        {errors.maxAmount && touched.maxAmount && (
                                            <div className="text-red-medium font-bold text-sm mt-1">
                                                {errors.maxAmount}
                                            </div>
                                        )}
                                    </div>

                                    {/* Last Date of Donation */}
                                    <div>
                                        <label
                                            htmlFor="lastDateDon"
                                            className="block text-sm font-medium text-black-base mb-2">
                                            Last Date of Donation
                                        </label>
                                        <Field name="lastDateDon">
                                            {({ field, form }) => (
                                                <DateField
                                                    value={field.value}
                                                    onChange={(val) => form.setFieldValue("lastDateDon", val)}
                                                    placeholder={"Select the last date people can donate..."}
                                                />
                                            )}
                                        </Field>
                                        {errors.lastDateDon && touched.lastDateDon && (
                                            <div className="text-red-medium font-bold text-sm mt-1">
                                                {errors.lastDateDon}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Short Description */}
                            <div>
                                <label htmlFor="shortDesc" className="block text-sm font-medium text-black-base mb-2">
                                    Short Description
                                </label>
                                <Field
                                    as="textarea"
                                    name="shortDesc"
                                    id="shortDesc"
                                    rows={4}
                                    placeholder="Write a short description about the donation campaign, purpose etc."
                                    className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-base-orange rounded-lg transition-all duration-200 resize-none ${
                                        errors.shortDesc && touched.shortDesc
                                            ? "border-red-base bg-red-light"
                                            : "border-gray-border bg-base-white"
                                    }`}
                                />
                                {errors.shortDesc && touched.shortDesc && (
                                    <div className="text-red-medium font-bold text-sm mt-1">{errors.shortDesc}</div>
                                )}
                            </div>

                            {/* Long Description */}
                            <div>
                                <label htmlFor="longDesc" className="block text-sm font-medium text-black-base mb-2">
                                    Long Description
                                </label>
                                <TiptapEditor
                                    name="longDesc"
                                    label={null}
                                    editorClassName="w-full min-h-[200px] max-h-[320px] border border-gray-border rounded-lg bg-base-white focus-within:border-base-orange transition-all duration-200 overflow-auto px-3 py-2"
                                />
                                {errors.longDesc && touched.longDesc && (
                                    <div className="text-red-medium font-bold text-sm mt-1">{errors.longDesc}</div>
                                )}
                            </div>

                            <div className="pt-4 flex gap-4">
                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    className="w-full font-semibold py-6 px-8 rounded-lg transition-colors duration-300 ease-in-out hover:bg-hover-rose-dark text-white"
                                    style={{
                                        backgroundColor: isSubmitting ? "#cccccc" : "#E86F69",
                                        cursor: isSubmitting ? "not-allowed" : "pointer",
                                    }}
                                    disabled={isSubmitting}
                                    onMouseEnter={(e) => {
                                        if (!isSubmitting) {
                                            e.target.style.backgroundColor = "#E34D46";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSubmitting) {
                                            e.target.style.backgroundColor = "#E86F69";
                                        }
                                    }}>
                                    {isSubmitting ? "Creating Your Donation Campaign..." : "Create Donation Campaign"}
                                </Button>

                                {/* Cancel button shown when submitting */}
                                {isSubmitting && (
                                    <Button
                                        type="button"
                                        className="font-semibold py-6 px-8 rounded-lg transition-colors duration-300 ease-in-out bg-red-500 hover:bg-red-700 text-white"
                                        onClick={() => {
                                            setCancelled(true);
                                            toast.info("You have canceled form submission.");
                                        }}>
                                        Cancel Submission
                                    </Button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateDonationsForm;
