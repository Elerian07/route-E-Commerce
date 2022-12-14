import { create, deleteOne, findById, findByIdAndDelete, findByIdAndUpdate, findOne, findOneAndUpdate, updateOne } from "../../../../DB/DBMethods.js";
import categoryModel from "../../../../DB/model/category.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";


//create
export const addCategory = asyncHandler(async (req, res, next) => {
    if (!req.file) {
        return next(new Error("you have to upload an image", { cause: 422 }))
    } else {
        let { name } = req.body;
        let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "category"
        })
        let result = await create({ model: categoryModel, data: { name, image: secure_url, createdBy: req.user._id, public_id } })
        return res.status(201).json({ message: "Category Created", result })
    }
})
//find
export const findCategory = asyncHandler(async (req, res, next) => {
    let { search } = req.query;
    let category = await findOne({ model: categoryModel, condition: { name: search } });
    if (!category) {
        return next(new Error("Category not found", { cause: 404 }))
    } else {
        return res.status(200).json({ message: "found", category })
    }
})
//delete
export const deleteCategory = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    let category = await findById({ model: categoryModel, condition: { _id: id } })
    if (!category) {
        return next(new Error("Category not found", { cause: 404 }))
    } else {
        if (category.createdBy.equals(req.user._id)) {
            let deletedImage = await cloudinary.uploader.destroy(category.public_id)
            let deletedCategory = await findByIdAndDelete({ model: categoryModel, condition: { _id: id } })
            res.status(200).json({ message: "Category has been deleted", deletedCategory })
        } else {
            return next(new Error("you are not authorized to delete this category", { cause: 403 }))
        }

    }
})

//update
export const updateCategory = asyncHandler(async (req, res, next) => {
    let { _id } = req.params;
    let { name } = req.body;
    const category = await findById({ model: categoryModel, condition: _id });
    if (!category) {
        return next(new Error("category not found", { cause: 404 }));
    } else {
        let imgUrl = "";
        let publicImgId = "";
        if (req.file) {
            await cloudinary.uploader.destroy(category.public_id)

            let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "category" });
            imgUrl = secure_url;
            publicImgId = public_id;

        } else {
            imgUrl = category.image;
            publicImgId = category.public_id;
        }
        let updatedCategory = await findByIdAndUpdate({
            model: categoryModel, condition: { _id },
            data: { name, image: imgUrl, public_id: publicImgId },
            options: { new: true }
        });
        return res.status(200).json({ message: "updated", updatedCategory })
    }
})
