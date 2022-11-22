import { Schema, model, Types } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'product name is required'],
        min: [2, 'product name minimum length 2 char'],
        max: [20, 'product name max length 2 char']

    },
    addBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'addBy is required']
    },
    images: {
        type: String,
        required: [true, 'Logo image is required'],
    }

}, {
    timestamps: true
})


const productModel = model('Product', productSchema)
export default productModel