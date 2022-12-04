import { Schema, model, Types } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'product name is required'],
        min: [2, 'product name minimum length 2 char'],
        max: [20, 'product name max length 2 char']

    },
    slug: String,
    description: {
        type: String,
        min: [2, 'product name minimum length 2 char'],
        max: [500, 'product name max length 2 char']
    },

    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, 'addBy is required']
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    images: {
        type: [String],
        required: [true, 'images is required'],
    },
    publicImgsId: [String],
    stock: {
        type: Number,
        default: 0,
        required: [true, 'product stock is required'],
    },
    price: {
        type: Number,
        required: [true, 'product price is required'],
    },
    discount: Number,
    finalPrice: Number,
    colors: {
        type: [String],
    },
    size: {
        type: String,
        default: "free",
        enums: ["S", "M", "L", "XL", "XXL", "XXXL", "free"]
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: [true, 'CategoryId is required']
    },

    subcategoryId: {
        type: Types.ObjectId,
        ref: "Subcategory",
        required: [true, 'SubcategoryId is required']
    },
    brandId: {
        type: Types.ObjectId,
        ref: "Brand",
        required: [true, 'BrandId is required']
    },
    soldItems: Number,
    totalItems: Number
}, {
    timestamps: true
})


const productModel = model('Product', productSchema)
export default productModel