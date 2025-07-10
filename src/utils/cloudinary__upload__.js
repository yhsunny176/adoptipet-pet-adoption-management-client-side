import { toast } from "react-toastify";

const uploadImageCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.error?.message || `HTTP error! status: ${response.status}`;
            toast.error(`Image upload failed: ${errorMessage}`);
            throw new Error(errorMessage);
        }

        const data = await response.json();

        return {
            success: true,
            url: data.secure_url,
            publicId: data.public_id,
            data: data,
        };
    } catch (error) {
        toast.error("Error uploading to Cloudinary:", error);
        if (!error.message.includes("Image upload failed")) {
            toast.error("Network error: Unable to upload image");
        }
        return {
            success: false,
            error: error.message,
        };
    }
};

export default uploadImageCloudinary;
