import subcategoryModel from "../../../../DB/model/subcategory.model.js";
import { create, deleteOne, findById, findByIdAndDelete, findByIdAndUpdate, findOne, updateOne, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";
import categoryModel from "../../../../DB/model/category.model.js";


export const addSubcategory = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    if (!req.file) {
        next(new Error("you have to upload an image", { cause: 422 }))
    } else {
        let { name } = req.body;
        let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "category/subcategory"
        })
        let result = await create({ model: subcategoryModel, data: { name, image: secure_url, createdBy: req.user._id, categoryId: id, public_id } })
        res.status(201).json({ message: "Subcategory Created", result })
    }
})

export const deleteSubcategory = asyncHandler(async (req, res, next) => {
    let { subId } = req.params;
    let subcategory = await findById({ model: subcategoryModel, condition: { _id: subId } })
    if (!subcategory) {
        next(new Error("Subcategory not found", { cause: 404 }))
    } else {
        if (subcategory.createdBy.equals(req.user._id)) {
            let deletedImage = await cloudinary.uploader.destroy(subcategory.public_id)
            let deleteSubcategory = await findByIdAndDelete({ model: subcategoryModel, condition: { _id: subId } })
            res.status(200).json({ message: "Subcategory has been deleted", deleteSubcategory })
        } else {
            next(new Error("you are not authorized to delete this category", { cause: 403 }))
        }

    }
})
export const findSubcategory = asyncHandler(async (req, res, next) => {
    let { search } = req.query;
    let subcategory = await findOne({ model: subcategoryModel, condition: { name: search } });
    if (!subcategory) {
        next(new Error("Subcategory not found", { cause: 404 }))
    } else {
        res.status(200).json({ message: "found", subcategory })
    }
})

export const updateSubcategory = asyncHandler(async (req, res, next) => {
    let { _id } = req.params;
    let { name } = req.body;
    const subcategory = await findById({ model: subcategoryModel, condition: _id });
    if (!subcategory) {
        next(new Error("subcategory not found", { cause: 404 }));
    } else {
        let imgUrl = "";
        let publicImgId = "";
        if (req.file) {
            await cloudinary.uploader.destroy(subcategory.public_id)

            let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "category/subcategory" });
            imgUrl = secure_url;
            publicImgId = public_id;

        } else {
            imgUrl = category.image;
            publicImgId = category.public_id;
        }
        let updatedSubcategory = await findByIdAndUpdate({
            model: subcategoryModel, condition: { _id },
            data: { name, image: imgUrl, public_id: publicImgId },
            options: { new: true }
        });
        res.status(200).json({ message: "updated", updatedSubcategory })
    }


})