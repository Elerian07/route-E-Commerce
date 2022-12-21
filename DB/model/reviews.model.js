import { Schema, model, Types } from "mongoose";


const reviewsSchema = new Schema({
    text: {
        type: String,
        min: [2, 'product name minimum length 2 char'],
        max: [500, 'product name max length 2 char']

    },
    addBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'addBy is required']
    },
    productId: {
        type: Types.ObjectId,
        ref: "Product",
        required: [true, 'product ID is required']
    },
    rating: {
        type: String,
        min: [1, "rating Average must be greater than 1"],
        max: [5, "rating Average must be less than 5"],
        required: [true, 'Logo image is required'],
    }

}, {
    timestamps: true
})


const reviewsModel = model('Review', reviewsSchema)
export default reviewsModel