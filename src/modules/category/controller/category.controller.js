import { create, deleteOne, findById, findByIdAndDelete, findByIdAndUpdate, findOne, updateOne } from "../../../../DB/DBMethods.js";
import categoryModel from "../../../../DB/model/category.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";



export const addCategory = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        next(new Error("you have to upload an image", { cause: 422 }))
    } else {
        let { name } = req.body;
        let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "category"
        })
        let result = await create(categoryModel, { name, image: secure_url, createdBy: req.user._id, public_id })
        res.status(201).json({ message: "Category Created", result })
    }
})

export const findCategory = asyncHandler(async (req, res, next) => {
    let { search } = req.query;
    let category = await findOne(categoryModel, { name: search });
    if (!category) {
        next(new Error("Category not found", { cause: 404 }))
    } else {
        res.status(200).json({ message: "found", category })
    }
})

export const deleteCategory = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    let category = await findById(categoryModel, { _id: id })
    if (!category) {
        next(new Error("Category not found", { cause: 404 }))
    } else {
        if (category.createdBy.equals(req.user._id)) {
            let deletedImage = await cloudinary.uploader.destroy(category.public_id)
            let deletedCategory = await findByIdAndDelete(categoryModel, { _id: id })
            res.status(200).json({ message: "Category has been deleted", deletedCategory })
        } else {
            next(new Error("you are not authorized to delete this category", { cause: 403 }))
        }

    }
})


export const updateCategory = asyncHandler(async (req, res, next) => {
    let { _id } = req.params;
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "category"
        })
        req.body.image = secure_url
        req.body.publicImageId = public_id
    }
    const result = await categoryModel.findByIdAndUpdate(_id, req.body, { new: true })
    if (!result) {
        await cloudinary.uploader.destroy(req.body.publicImageId)
        next(new Error("category not found", { cause: 404 }))
    } else {
        await cloudinary.uploader.destroy(result.publicImageId)

        res.status(200).json({ message: "updated", result })
    }

})