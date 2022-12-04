import { create, deleteOne, find, findById, findByIdAndDelete, findByIdAndUpdate, findOne, findOneAndUpdate, updateOne } from "../../../../DB/DBMethods.js";
import categoryModel from "../../../../DB/model/category.model.js";
import subcategoryModel from '../../../../DB/model/subcategory.model.js';
import brandModel from '../../../../DB/model/brand.model.js';
import productModel from "../../../../DB/model/product.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";
import slugify from "slugify";
import { paginate } from "../../../services/pagination.js";



export const addProduct = asyncHandler(async (req, res, next) => {
    let { subcategoryId, categoryId, brandId } = req.params;
    let subcategory = await findOne({ model: subcategoryModel, condition: { _id: subcategoryId, categoryId } })
    if (!subcategory) {
        next(new Error("Subcategory or Category not found", { cause: 404 }))
    } else {
        let brand = await findById({ model: brandModel, condition: { _id: brandId } });
        if (!brand) {
            next(new Error("Brand not found", { cause: 404 }))
        } else {

            if (!req.files?.length) {
                next(new Error("you have to add product images", { cause: 400 }));
            } else {

                let { name, discount, price } = req.body;
                req.body.slug = slugify(name);
                req.body.stock = req.body.totalItems;

                req.body.finalPrice = price - ((price * discount || 0) / 100)

                req.body.categoryId = categoryId;
                req.body.subcategoryId = subcategoryId;
                req.body.brandId = brandId;
                req.body.createdBy = req.user._id;
                req.body.soldItems = 0;

                let imgsUrl = [];
                let imgsId = [];
                for (const file of req.files) {
                    let { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: "Brand/Products" });
                    imgsUrl.push(secure_url);
                    imgsId.push(public_id);
                }
                req.body.images = imgsUrl;
                req.body.publicImgsId = imgsId;
                let product = await create({ model: productModel, data: req.body });
                if (!product) {
                    for (const id of imgsId) {
                        await cloudinary.uploader.destroy(id);
                    }
                    next(new Error("Error when insert into database", { cause: 400 }));
                } else {
                    res.status(201).json({ message: "Created", product })
                }


            }
        }
    }
})

export const updateProduct = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    let product = await findById({ model: productModel, condition: { _id: id } })
    if (!product) {
        next(new Error("product not found", { cause: 404 }))
    } else {
        let { price, discount, name, totalItems, soldItems } = req.body;
        if (name) {
            req.body.slug = slugify(name);
        }
        if (price && discount) {
            req.body.finalPrice = price - ((price * discount) / 100);
        } else if (price) {
            req.body.finalPrice = price - ((price * product.discount) / 100);
        } else if (discount) {
            req.body.finalPrice = product.price - ((product.price * discount) / 100);
        }

        if (totalItems) {
            let currentStock = totalItems - product.soldItems;
            req.body.stock = currentStock > 0 ? currentStock : 0;
        }

        if (soldItems) {
            let currentStock = product.totalItems - soldItems;
            req.body.stock = currentStock > 0 ? currentStock : 0;
        }
        if (req.body.colors) {
            for (const color of req.body.colors) {
                product.colors.push(color);
            }
        }

        if (req.files?.length) {
            let imgsUrl = [];
            let imgsId = [];
            for (const file of req.files) {
                let { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: "Brand/Products" });
                imgsUrl.push(secure_url);
                imgsId.push(public_id);
            }
            req.body.images = imgsUrl;
            req.body.publicImgsId = imgsId;
        }
        req.body.updatedBy = req.user._id;

        let updatedProduct = await findByIdAndUpdate({ model: productModel, condition: { _id: id }, data: req.body, options: { new: true } });
        if (!updatedProduct) {
            if (req.body.publicImgsId) {
                for (const id of req.body.publicImgsId) {
                    await cloudinary.uploader.destroy(id)
                }
            }
            next(new Error("Database Error", { cause: 400 }))
        } else {
            if (req.body.publicImgsId) {
                for (const id of product.publicImgsId) {
                    await cloudinary.uploader.destroy(id)
                }
            }

            res.status(200).json({ message: "Updated", updatedProduct })
        }
    }
})

export const getAllProducts = asyncHandler(async (req, res, next) => {

    const populate = [
        {
            path: "categoryId",

        },
        {
            path: "subcategoryId",

        },
        {
            path: "brandId",

        },
        {
            path: "createdBy",
            select: "userName -_id"
        },
    ]
    let { limit, skip } = paginate(req.query.page, req.query.size);

    let products = await find({ model: productModel, limit: limit, skip: skip, populate: [...populate] })
    if (!products) {
        next(new Error("Not found", { cause: 404 }))
    } else {
        res.status(200).json({ message: "Products found", products })
    }
})


export const deleteProduct = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    let product = await findById({ model: productModel, condition: { _id: id } })
    if (!product) {
        next(new Error("Product not found", { cause: 404 }))
    } else {
        if (product.createdBy.equals(req.user._id) || req.user.role != "Admin") {
            for (const id of product.publicImgsId) {

                let deletedImage = await cloudinary.uploader.destroy(id)
            }
            let deletedProduct = await findByIdAndDelete({ model: productModel, condition: { _id: id } })
            res.status(200).json({ message: "Product has been deleted", deletedProduct })
        } else {
            next(new Error("you are not authorized to delete this product", { cause: 403 }))
        }

    }
})