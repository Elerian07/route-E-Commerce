import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";



export const addCategory = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        next(new Error("you have to upload an image", { cause: 422 }))
    } else {
        let { secure_url } = await cloudinary.uploader.upload(req.file.path, {
            folder: "category"
        })
    }
})