import { Schema, model, Types } from "mongoose";


const subcategorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'subcategory name is required'],
        min: [2, 'category name minimum length 2 char'],
        max: [20, 'category name max length 2 char']

    },
    image: {
        type: String,
        required: [true, 'subcategory image is required'],
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'createdBy is required']
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: [true, 'categoryId is required']
    }

}, {
    timestamps: true
})


const subcategoryModel = model('SubcategorySchema', subcategorySchema)
export default subcategoryModel