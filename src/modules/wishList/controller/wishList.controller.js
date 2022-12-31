import { findById, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import productModel from "../../../../DB/model/product.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";





//create
export const addWishList = asyncHandler(async (req, res, next) => {
    let { productId } = req.params;
    let founded = await findById({ model: productModel, condition: { _id: productId } });
    if (!founded) {
        return next(new Error("Product not found", { cause: 404 }))
    }

    let updated = await findByIdAndUpdate({
        model: userModel,
        condition: req.user._id,
        data: {

            $addToSet: { wishList: productId },
        }
        ,
        options: { new: true }
    })

    return res.status(200).json({ message: "Added to Wish List", updated })
})
//delete
export const removeWishList = asyncHandler(async (req, res, next) => {
    let { productId } = req.params;
    let founded = await findById({ model: productModel, condition: { _id: productId } });
    if (!founded) {
        return next(new Error("Product not found", { cause: 404 }))
    }

    let updated = await findByIdAndUpdate({
        model: userModel,
        condition: req.user._id,
        data: {

            $pull: { wishList: productId },
        }
        ,
        options: { new: true }
    })

    return res.status(200).json({ message: "Removed to Wish List", updated })
})