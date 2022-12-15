
import { Schema, model, Types } from "mongoose";


const cartSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required'],
        unique: true
    },
    products: {
        type: [{
            productId: {
                type: Types.ObjectId,
                ref: "Product",
                required: [true, 'productId is required']
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]
    }
}, {
    timestamps: true
})


const cartModel = model('Cart', cartSchema)
export default cartModel