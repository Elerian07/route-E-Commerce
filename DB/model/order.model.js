import { Schema, model, Types } from "mongoose";


const orderSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required']
    },
    products: {
        type: [{
            productId: {
                type: Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]
    },
    address: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    },
    couponId: {
        type: Types.ObjectId,
        ref: "Coupon"
    },
    status: {
        type: String,
        enum: ['placed', 'received', 'rejected', 'preparing', 'on Way'],
        default: 'placed'
    },
    payment: {
        type: String,
        enum: ['cash', 'credit card '],
        default: 'cash'
    }

}, {
    timestamps: true
})


const orderModel = model('Order', orderSchema)
export default orderModel