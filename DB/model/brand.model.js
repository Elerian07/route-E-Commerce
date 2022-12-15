
import { Schema, model, Types } from "mongoose";


const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required'],
        min: [2, 'Brand name minimum length 2 char'],
        max: [20, 'Brand name max length 2 char']

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
    public_id: String,
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'createdBy is required']
    },
}, {
    timestamps: true
})


const brandModel = model('Brand', brandSchema)
export default brandModel