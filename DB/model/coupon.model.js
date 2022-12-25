import { Schema, model, Types } from "mongoose";


const couponSchema = new Schema({
    name: {
        type: String,
        required: [true, 'coupon name is required'],
        min: [2, 'coupon name minimum length 2 char'],
        max: [20, 'coupon name max length 2 char'],
        trim: true,
        unique: true

    },
    amount: {
        type: Number,
        min: [1],
        max: [100],
        required: [true, 'amount is required'],
    },
    expireIn: {
        type: Date,
        required: [true, 'expireIn is required']
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'createdBy is required']
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: "User",
    }, deletedBy: {
        type: Types.ObjectId,
        ref: "User",
    },
    usedBy: {
        type: Types.ObjectId,
        ref: "User",
    },
    isStopped: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})


const couponModel = model('Coupon', couponSchema)
export default couponModel