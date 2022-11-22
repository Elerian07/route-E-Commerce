import { Schema, model, Types } from "mongoose";


const couponSchema = new Schema({

    amount: {
        type: String,
        required: [true, 'amount is required'],
    },
    addBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'addBy is required']
    },
    usedBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'usedBy is required']
    }

}, {
    timestamps: true
})


const couponModel = model('Coupon', couponSchema)
export default couponModel