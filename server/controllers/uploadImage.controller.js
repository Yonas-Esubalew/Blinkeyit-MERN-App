import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

export async function uploadImageController(req, res) {
    try {
        const file = req.file
        console.log(file)

        const uploadImage = await uploadImageCloudinary(file)
        return res.json({
            message: "File Uploaded Successfully.",
            data: uploadImage,
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}