import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import TiptapEditor from "../long-text-editor/TipTapEditor";
import ImageField from "../photo-upload-field/ImageField";
import { petCategoryOptions } from "@/utils/pet_categories";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const validationSchema = Yup.object({
    photoFile: Yup.mixed()
        .nullable()
        .test("imageValidation", "Pet photo is required", function (value) {
            const { photoURL } = this.parent;
            if (typeof photoURL === "string" && photoURL.trim().length > 0) {
                // If there's also a new file, validate it
                if (value) {
                    if (value.size > 5 * 1024 * 1024) {
                        return this.createError({ message: "File size must be less than 5MB" });
                    }
                    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(value.type)) {
                        return this.createError({ message: "Only Images are allowed" });
                    }
                }
                return true;
            }

            // If no existing photoURL, we need a new file
            if (value) {
                if (value.size > 5 * 1024 * 1024) {
                    return this.createError({ message: "File size must be less than 5MB" });
                }
                if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(value.type)) {
                    return this.createError({ message: "Only Images are allowed" });
                }
                return true;
            }

            // If No existing URL and no new file
            return this.createError({ message: "Pet photo is required" });
        }),
    petName: Yup.string().required("Pet name is required"),
    petAge: Yup.string().required("Pet age is required"),
    petLocation: Yup.string().required("Pet location is required"),
    petCategory: Yup.object().required("Pet category is required"),
    shortDesc: Yup.string().required("Short Description is required"),
    longDesc: Yup.string().required("Long description is required"),
});

const UpdatePetForm = ({ petInfo }) => {
    const [showUpload, setShowUpload] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { pet_name, pet_age, category, location, short_desc, long_desc, pet_image, _id } = petInfo || {};

    // Mutation for updating pet info
    const updatePetMutation = useMutation({
        mutationFn: async (petData) => {
            const response = await axiosSecure.patch(`/pet-update/${_id}`, petData);
            return response.data;
        },
    });

    return (
        <div className="bg-background-tertiary w-full">
            <div className="w-full max-w-full mx-auto bg-background-tertiary backdrop-blur-sm rounded-2xl p-8 border border-gray-border shadow-card-primary">
                <Formik
                    initialValues={{
                        photoURL: pet_image || "",
                        photoFile: null,
                        petName: pet_name || "",
                        petAge: pet_age || "",
                        petLocation: location || "",
                        petCategory: category ? petCategoryOptions.find((opt) => opt.value === category) : null,
                        shortDesc: short_desc || "",
                        longDesc: long_desc || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            let petData;
                            let photoURL = values.photoURL;

                            if (values.photoFile) {
                                // Upload image to Cloudinary and get the URL
                                const uploadImageCloudinary = (await import("@/utils/cloudinary__upload__")).default;
                                const uploadResult = await uploadImageCloudinary(values.photoFile);
                                if (uploadResult.success && uploadResult.url) {
                                    photoURL = uploadResult.url;
                                } else {
                                    throw new Error(uploadResult.error || "Image upload failed");
                                }
                            }
                            petData = {
                                pet_name: values.petName,
                                pet_image: photoURL,
                                pet_age: values.petAge,
                                location: values.petLocation,
                                category: values.petCategory?.value,
                                short_desc: values.shortDesc,
                                long_desc: values.longDesc,
                            };

                            await updatePetMutation.mutateAsync(petData);

                            await Swal.fire({
                                icon: "success",
                                title: "Pet Updated Successfully!",
                                confirmButtonText: "OK",
                                customClass: {
                                    title: "swal-title-custom-font",
                                },
                            });
                        } catch (error) {
                            toast.error(error.message || "Failed Updating Pet. Please Try Again!");
                        } finally {
                            setSubmitting(false);
                        }
                    }}>
                    {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                        <Form className="pet-add-form space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Photo Upload or Preview */}
                                <div>
                                    {showUpload ? (
                                        <div>
                                            <ImageField nameFile="photoFile" nameURL="photoURL" label="Pet Photo" />
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    setShowUpload(false);
                                                    // Reset file and restore original URL
                                                    setFieldValue("photoFile", null);
                                                    setFieldValue("photoURL", pet_image);
                                                }}
                                                className="mt-4 bg-gray-500 px-3 py-6 text-base-white w-full">
                                                Keep Current Image
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="pet-image-preview">
                                            {values.photoURL && (
                                                <img
                                                    src={values.photoURL}
                                                    alt="Pet"
                                                    className="relative rounded-lg w-full h-auto max-h-64 object-cover"
                                                />
                                            )}
                                            <Button
                                                type="button"
                                                onClick={() => setShowUpload(true)}
                                                className="mt-4 bg-blue-regular px-3 py-6 text-base-white w-full">
                                                Change Image
                                            </Button>
                                        </div>
                                    )}
                                    {/* Show validation error for image */}
                                    {errors.photoFile && touched.photoFile && (
                                        <div className="text-red-medium font-bold text-sm mt-1">{errors.photoFile}</div>
                                    )}
                                </div>

                                {/* Basic Pet Info */}
                                <div className="space-y-6">
                                    {/* Pet Name */}
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
                                    {/* Pet Age */}
                                    <div>
                                        <label
                                            htmlFor="petAge"
                                            className="block text-sm font-medium text-black-base mb-2">
                                            Pet Age
                                        </label>
                                        <Field
                                            type="text"
                                            name="petAge"
                                            id="petAge"
                                            placeholder="Enter the pet age"
                                            className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-base-orange rounded-lg transition-all duration-200 ${
                                                errors.petAge && touched.petAge
                                                    ? "border-red-base bg-red-light"
                                                    : "border-gray-border bg-base-white"
                                            }`}
                                        />
                                        {errors.petAge && touched.petAge && (
                                            <div className="text-red-medium font-bold text-sm mt-1">
                                                {errors.petAge}
                                            </div>
                                        )}
                                    </div>
                                    {/* Pet Location */}
                                    <div>
                                        <label
                                            htmlFor="petLocation"
                                            className="block text-sm font-medium text-black-base mb-2">
                                            Pet Location
                                        </label>
                                        <Field
                                            type="text"
                                            name="petLocation"
                                            id="petLocation"
                                            placeholder="Enter location from where the pet can be picked up"
                                            className={`w-full px-4 py-3 border border-gray-border focus:outline-0 focus:border-base-orange rounded-lg transition-all duration-200 ${
                                                errors.petLocation && touched.petLocation
                                                    ? "border-red-base bg-red-light"
                                                    : "border-gray-border bg-base-white"
                                            }`}
                                        />
                                        {errors.petLocation && touched.petLocation && (
                                            <div className="text-red-medium font-bold text-sm mt-1">
                                                {errors.petLocation}
                                            </div>
                                        )}
                                    </div>
                                    {/* Pet Category */}
                                    <div>
                                        <label
                                            htmlFor="petCategory"
                                            className="block text-sm font-medium text-black-base mb-2">
                                            Pet Category
                                        </label>
                                        <Select
                                            inputId="petCategory"
                                            name="petCategory"
                                            options={petCategoryOptions}
                                            value={values.petCategory}
                                            onChange={(option) => setFieldValue("petCategory", option)}
                                            placeholder="Select pet category"
                                            className={`w-full${
                                                errors.petCategory && touched.petCategory
                                                    ? " react-select__control--is-invalid"
                                                    : ""
                                            }`}
                                            classNamePrefix="react-select"
                                        />
                                        {errors.petCategory && touched.petCategory && (
                                            <div className="text-red-medium font-bold text-sm mt-1">
                                                {typeof errors.petCategory === "string"
                                                    ? errors.petCategory
                                                    : errors.petCategory.label || "Pet category is required"}
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
                                    placeholder="Write a short description (e.g, What pet eats, how to take care etc.) ..."
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
                                {/* Update button */}
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
                                    {isSubmitting ? "Updating..." : "Update Pet"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default UpdatePetForm;
