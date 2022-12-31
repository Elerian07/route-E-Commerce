import { asyncHandler } from "../../../services/asyncHandler.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import { create, findByIdAndUpdate, findOneAndUpdate } from "../../../../DB/DBMethods.js";



//create
export const addCoupon = asyncHandler(async (req, res, next) => {
    req.body.createdBy = req.user._id;
    let added = await create({ model: couponModel, data: req.body });
    return res.status(201).json({ message: "Added", added })
})

//update
export const updateCoupon = asyncHandler(async (req, res, next) => {
    req.body.updatedBy = req.user._id;
    let { name } = req.params;
    let updated = await findOneAndUpdate({ model: couponModel, condition: name, data: req.body, options: { new: true } });
    return res.status(200).json({ message: "Updated", updated })
})

//stop
export const stopCoupon = asyncHandler(async (req, res, next) => {
    req.body.deletedBy = req.user._id;
    let { couponId } = req.params;
    let Stopped = await findByIdAndUpdate({ model: couponModel, condition: { _id: couponId }, data: { isStopped: true, deletedBy: req.user._id }, options: { new: true } });
    return res.status(200).json({ message: "Coupon has been Stopped", Stopped })
})