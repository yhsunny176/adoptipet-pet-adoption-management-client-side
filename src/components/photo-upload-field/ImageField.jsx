import React, { useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import uploadImageCloudinary from "@/utils/cloudinary__upload__";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01FreeIcons, Image02Icon } from "@hugeicons/core-free-icons/index";

const ImageField = ({ nameFile, nameURL, label }) => {
    const [meta] = useField(nameFile);
    const { setFieldValue } = useFormikContext();
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [removed, setRemoved] = useState(false);
    const canceledRef = useRef(false);

    // Handle Image Change in Formik Field
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        canceledRef.current = false;
        setCanceled(false);
        setRemoved(false);
        if (file) {
            setUploading(true);
            setUploadSuccess(false);
            setUploadError("");
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);

            setFieldValue(nameFile, file);

            try {
                const uploadResult = await uploadImageCloudinary(file);
                if (canceledRef.current) return;
                if (!uploadResult.success) {
                    throw new Error(uploadResult.error);
                }
                setFieldValue(nameURL, uploadResult.url);
                setUploadSuccess(true);
                setUploadError("");
            } catch (error) {
                if (canceledRef.current) return;
                setFieldValue(nameURL, "");
                setFieldValue(nameFile, null);
                setImagePreview(null);
                setUploadSuccess(false);
                setUploadError(error.message || "Image upload failed!");
            } finally {
                setUploading(false);
            }
        }
    };

    // Handling Cross Button in Field upload
    const handleRemoveImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // Handle cross button while Image is uploading
        if (uploading) {
            canceledRef.current = true;
            setFieldValue(nameURL, "");
            setFieldValue(nameFile, null);
            setImagePreview(null);
            setUploadSuccess(false);
            setUploadError("");
            setUploading(false);
            setCanceled(true);
            setRemoved(false);
        } else {
            // Handle cross button after image uploaded
            setFieldValue(nameURL, "");
            setFieldValue(nameFile, null);
            setImagePreview(null);
            setUploadSuccess(false);
            setUploadError("");
            setUploading(false);
            setCanceled(false);
            setRemoved(true);
        }
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-black-base mb-3">{label}</label>
            <div className="relative border-2 border-dashed border-base-orange rounded-lg min-h-[300px]">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                    id={`${nameFile}-upload`}
                    disabled={imagePreview || uploading}
                />
                <label
                    htmlFor={!imagePreview && !uploading ? `${nameFile}-upload` : undefined}
                    className={`flex items-center justify-center w-full h-full px-4 py-3 rounded-lg transition-all duration-500 min-h-[300px] ${
                        !imagePreview && !uploading ? "cursor-pointer hover:border-base-rose-dark hover:bg-blue-bg" : ""
                    } ${
                        meta.touched && meta.error ? "border-red-base bg-red-light" : "border-gray-border bg-base-white"
                    } relative overflow-hidden`}>
                    {imagePreview ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 w-8 h-8 bg-base-rose cursor-pointer hover:bg-base-rose-dark rounded-full flex items-center justify-center z-10 transition-all duration-200 shadow-md">
                                <HugeiconsIcon className="text-base-white" size={12} icon={Cancel01FreeIcons} />
                            </button>
                            {uploading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
                                    <span className="text-base font-semibold text-navitem-base">
                                        Uploading image...
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center h-full flex flex-col items-center justify-center">
                            <HugeiconsIcon className="text-gray-medium" icon={Image02Icon} size={48} />
                            <div className="mt-4">
                                <p className="text-sm text-gray-medium">
                                    <span className="font-medium text-base-orange">Click to upload</span> or drag and
                                    drop
                                </p>
                                <p className="text-sm text-gray-medium mt-1">PNG, JPG, WebP (Max 5MB)</p>
                            </div>
                        </div>
                    )}
                </label>
            </div>
            {meta.touched && meta.error && <div className="text-red-medium font-bold text-sm mt-1">{meta.error}</div>}
            {!imagePreview && uploading && (
                <div className="mt-2 font-pg font-semibold text-sm text-navitem-base">
                    <p>Uploading Image</p>
                </div>
            )}
            {uploadSuccess && !uploading && (
                <div className="mt-2 font-semibold text-sm text-green-600">Image uploaded successfully!</div>
            )}
            {uploadError && !uploading && <div className="mt-2 font-semibold text-sm text-red-base">{uploadError}</div>}
            {canceled && <div className="mt-2 font-semibold text-sm text-red-base">Upload canceled</div>}
            {removed && <div className="mt-2 font-semibold text-sm text-red-base">Image removed, upload new image</div>}
        </div>
    );
};

export default ImageField;
