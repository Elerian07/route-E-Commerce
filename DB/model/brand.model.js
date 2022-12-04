
import { Schema, model, Types } from "mongoose";


const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'subcategory name is required'],
        min: [2, 'category name minimum length 2 char'],
        max: [20, 'category name max length 2 char']

    },
    slug: String,
    addBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'addBy is required']
    },
    logo: {
        type: String,
        required: [true, 'Logo image is required'],
    },
    public_id: String

}, {
    timestamps: true
})


const brandModel = model('Brand', brandSchema)
export default brandModel