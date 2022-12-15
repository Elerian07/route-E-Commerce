import { asyncHandler } from "../../../services/asyncHandler.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import { create, findByIdAndUpdate, findOneAndUpdate } from "../../../../DB/DBMethods.js";




export const addCoupon = asyncHandler(async (req, res, next) => {
    req.body.createdBy = req.user._id;
    let added = await create({ model: couponModel, data: req.body });
    console.log(req.body);
    res.status(201).json({ message: "Added", added })
})


export const updateCoupon = asyncHandler(async (req, res, next) => {
    req.body.updatedBy = req.user._id;
    let { name } = req.params;
    let updated = await findOneAndUpdate({ model: couponModel, condition: name, data: req.body, options: { new: true } });
    res.status(200).json({ message: "Updated", updated })
})


export const stopCoupon = asyncHandler(async (req, res, next) => {
    req.body.deletedBy = req.user._id;
    let { couponId } = req.params;
    let Stopped = await findByIdAndUpdate({ model: couponModel, condition: { _id: couponId }, data: { isStopped: true, deletedBy: req.user._id }, options: { new: true } });
    res.status(200).json({ message: "Coupon has been Stopped", Stopped })
})