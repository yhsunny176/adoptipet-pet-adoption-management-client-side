import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import uploadImageCloudinary from "@/utils/cloudinary__upload__";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01FreeIcons, Image02Icon } from "@hugeicons/core-free-icons/index";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import TiptapEditor from "../long-text-editor/TipTapEditor";

const validationSchema = Yup.object({
    photo: Yup.mixed()
        .required("Image required")
        .test("fileSize", "File size must be less than 5MB", (value) => {
            if (!value) return false;
            return value.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Only Images are required", (value) => {
            if (!value) return false;
            return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(value.type);
        }),
    petName: Yup.string().required("Pet name is required"),
    petAge: Yup.string().required("Pet age is required"),
    petLocation: Yup.string().required("Pet location is required"),
    petCategory: Yup.object().required("Pet category is required"),
    shortDesc: Yup.string().required("Short Description is required"),
    longDesc: Yup.string().required("Long description is required"),
});

const petCategoryOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "rabbit", label: "Rabbit" },
    { value: "other", label: "Other" },
];

const AddPetForm = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    return (
        <div className="bg-background-tertiary w-full">
            <div className="w-full max-w-full mx-auto bg-background-tertiary backdrop-blur-sm rounded-2xl p-8 border border-gray-border shadow-card-primary">
                <Formik
                    initialValues={{
                        photo: null,
                        petName: "",
                        petAge: "",
                        petLocation: "",
                        petCategory: null,
                        shortDesc: "",
                        longDesc: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            setUploading(true);
                            // Upload image to Cloudinary
                            const uploadResult = await uploadImageCloudinary(values.photo);
                            if (!uploadResult.success) {
                                throw new Error(uploadResult.error);
                            }
                            Swal.fire({
                                icon: "success",
                                title: "You have successfully added a pet for adoption!",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            resetForm();
                        } catch (error) {
                            toast.error(error.message || "Failed Adding a Pet. Please Try Again!");
                        } finally {
                            setUploading(false);
                            setSubmitting(false);
                        }
                    }}>
                    {({ isSubmitting, errors, touched, values, setFieldValue }) => {
                        // Image change handler for Formik
                        const handleImageChange = (event) => {
                            const file = event.target.files[0];
                            if (file) {
                                setFieldValue("photo", file);
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setImagePreview(e.target.result);
                                };
                                reader.readAsDataURL(file);
                            }
                        };

                        return (
                            <Form className="pet-add-form space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Photo Upload */}
                                    <div className="space-y-4">
                                        <label
                                            htmlFor="photo"
                                            className="block text-sm font-medium text-black-base mb-3">
                                            Profile Photo
                                        </label>
                                        <div className="relative border-2 border-dashed border-base-orange rounded-lg min-h-[300px]">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="sr-only"
                                                id="photo-upload"
                                                disabled={imagePreview ? true : false}
                                            />
                                            <label
                                                htmlFor={imagePreview ? undefined : "photo-upload"}
                                                className={`flex items-center justify-center w-full h-full px-4 py-3 rounded-lg transition-all duration-500 min-h-[300px] ${
                                                    !imagePreview
                                                        ? "cursor-pointer hover:border-base-rose-dark hover:bg-blue-bg"
                                                        : ""
                                                } ${
                                                    errors.photo && touched.photo
                                                        ? "border-red-base bg-red-light"
                                                        : "border-gray-border bg-base-white"
                                                } relative overflow-hidden`}>
                                                {imagePreview ? (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setFieldValue("photo", null);
                                                                setImagePreview(null);
                                                            }}
                                                            className="absolute top-2 right-2 w-8 h-8 bg-base-rose cursor-pointer hover:bg-base-rose-dark rounded-full flex items-center justify-center z-10 transition-all duration-200 shadow-md">
                                                            <HugeiconsIcon
                                                                className="text-base-white"
                                                                size={12}
                                                                icon={Cancel01FreeIcons}
                                                            />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    /* Default Upload UI */
                                                    <div className="text-center h-full flex flex-col items-center justify-center">
                                                        <HugeiconsIcon
                                                            className="text-gray-medium"
                                                            icon={Image02Icon}
                                                            size={48}
                                                        />
                                                        <div className="mt-4">
                                                            <p className="text-sm text-gray-medium">
                                                                <span className="font-medium text-base-orange">
                                                                    Click to upload
                                                                </span>{" "}
                                                                or drag and drop
                                                            </p>
                                                            <p className="text-sm text-gray-medium mt-1">
                                                                PNG, JPG, WebP (Max 5MB)
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                        {errors.photo && touched.photo && (
                                            <div className="text-red-medium font-bold text-sm mt-1">{errors.photo}</div>
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
                                    <label
                                        htmlFor="shortDesc"
                                        className="block text-sm font-medium text-black-base mb-2">
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
                                    <label
                                        htmlFor="longDesc"
                                        className="block text-sm font-medium text-black-base mb-2">
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

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || uploading}
                                        className="w-full font-semibold py-6 px-8 rounded-lg transition-colors duration-300 ease-in-out hover:bg-hover-rose-dark disabled:opacity-50 disabled:cursor-not-allowed text-white"
                                        style={{
                                            backgroundColor: isSubmitting || uploading ? "#cccccc" : "#E86F69",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSubmitting && !uploading) {
                                                e.target.style.backgroundColor = "#E34D46";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSubmitting && !uploading) {
                                                e.target.style.backgroundColor = "#E86F69";
                                            }
                                        }}>
                                        {isSubmitting || uploading ? "Adding Pet" : "Add Pet"}
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default AddPetForm;
