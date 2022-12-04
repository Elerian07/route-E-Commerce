import brandModel from "../../../../DB/model/brand.model.js";
import cloudinary from '../../../services/cloudinary.js';
import { asyncHandler } from '../../../services/asyncHandler.js';
import { create, findById, findByIdAndDelete, findByIdAndUpdate, findOne } from '../../../../DB/DBMethods.js';
import slugify from "slugify";


export const addBrand = asyncHandler(async (req, res, nex) => {
    if (!req.file) {
        next(new Error("you have to upload an image", { cause: 422 }))
    } else {
        let { name } = req.body;
        req.body.slug = slugify(name);
        let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "Brand"
        })
        let result = await create({ model: brandModel, data: { name, logo: secure_url, addBy: req.user._id, public_id } })
        res.status(201).json({ message: "Brand Created", result })
    }
})

export const updateBrand = asyncHandler(async (req, res, next) => {
    let { _id } = req.params;
    let { name } = req.body;
    const brand = await findById({ model: brandModel, condition: _id });
    if (!brand) {
        next(new Error("brand not found", { cause: 404 }));
    } else {
        req.body.slug = slugify(name);
        let imgUrl = "";
        let publicImgId = "";
        if (req.file) {
            await cloudinary.uploader.destroy(brand.public_id)

            let { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "brand" });
            imgUrl = secure_url;
            publicImgId = public_id;

        } else {
            imgUrl = brand.image;
            publicImgId = brand.public_id;
        }
        let updatedBrand = await findByIdAndUpdate({
            model: brandModel, condition: { _id },
            data: { name, image: imgUrl, public_id: publicImgId },
            options: { new: true }
        });
        res.status(200).json({ message: "updated", updatedBrand })
    }
})
export const deleteBrand = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    let brand = await findById({ model: brandModel, condition: { _id: id } })
    if (!brand) {
        next(new Error("Brand not found", { cause: 404 }))
    } else {
        if (brand.addBy.equals(req.user._id)) {
            let deletedImage = await cloudinary.uploader.destroy(brand.public_id)
            let deletedBrand = await findByIdAndDelete({ model: brandModel, condition: { _id: id } })
            res.status(200).json({ message: "Brand has been deleted", deletedBrand })
        } else {
            next(new Error("you are not authorized to delete this Brand", { cause: 403 }))
        }

    }
})
export const findBrand = asyncHandler(async (req, res, next) => {
    let { search } = req.query;
    let brand = await findOne({ model: brandModel, condition: { name: search } });
    if (!brand) {
        next(new Error("Brand not found", { cause: 404 }))
    } else {
        res.status(200).json({ message: "found", brand })
    }
})