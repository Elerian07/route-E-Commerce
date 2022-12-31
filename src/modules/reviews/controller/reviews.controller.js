import { asyncHandler } from "../../../services/asyncHandler.js";

import { create, find, findById, findByIdAndDelete, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import reviewsModel from "../../../../DB/model/reviews.model.js";



//create
export const createReview = asyncHandler(async (req, res, next) => {
    req.body.addBy = req.user._id;
    const review = await create({ model: reviewsModel, data: req.body });
    return res.status(201).json({ message: "Review Created", review })
})
//update
export const updateReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let { text, rating } = req.body;
    const review = findById({ model: reviewsModel, condition: { _id: id } });
    if (!review) {
        return next(new Error("Review not found ", { cause: 404 }))
    } else {
        const updated = await findByIdAndUpdate({ model: reviewsModel, condition: { _id: id }, data: { text, rating }, options: { new: true } });
        return res.status(200).json({ message: "Updated", updated })
    }
})
//delete
export const deleteReview = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    const review = await findById({ model: reviewsModel, condition: { _id: id } });
    if (!review) {
        return next(new Error("Review not found ", { cause: 404 }))
    } else {
        const deleted = await findByIdAndDelete({ model: reviewsModel, condition: { _id: id } });
        return res.status(200).json({ message: "Deleted", deleted })
    }
})

//get all reviews
export const allReviews = asyncHandler(async (req, res, next) => {

    const populate = [
        {
            path: "productId",
            select: "name -_id"

        },
        {
            path: "addBy",
            select: "userName -_id"
        },
    ]

    const reviews = await find({ model: reviewsModel, populate: [...populate] })
    if (!reviews) {
        return next(new Error("Not found", { cause: 404 }))
    } else {
        return res.status(200).json({ message: "Reviews found", reviews })
    }


})