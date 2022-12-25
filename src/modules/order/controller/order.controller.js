import { asyncHandler } from "../../../services/asyncHandler.js";
import { create, findById, findByIdAndDelete, findByIdAndUpdate, findOne, updateOne } from '../../../../DB/DBMethods.js'
import productModel from "../../../../DB/model/product.model.js";
import orderModel from "../../../../DB/model/order.model.js";
import couponModel from "../../../../DB/model/coupon.model.js";







export const createOrder = asyncHandler(async (req, res, next) => {
    const { products, couponId } = req.body;
    const finalProducts = []
    let sumTotalPrice = 0;
    let finalPriceAfterDiscount = 0;
    for (const product of products) {
        let checkProduct = await findOne({ model: productModel, condition: { _id: product.productId, stock: { $gte: product.quantity } } });
        if (!checkProduct) {
            return next(new Error(`failed to place this order ${product.productId} `, { cause: 400 }));
        }
        product.totalPrice = (product.quantity * checkProduct.finalPrice)
        sumTotalPrice += product.totalPrice;
        finalProducts.push(product)

    }
    req.body.totalPrice = sumTotalPrice;

    if (couponId) {
        const coupon = await findOne({ model: couponModel, condition: { _id: couponId, usedBy: { $nin: req.user._id } } });
        if (!coupon) {
            return next(new Error("in-valid coupon", { cause: 400 }));
        }
        finalPriceAfterDiscount = req.body.totalPrice - (req.body.totalPrice * (coupon.amount / 100));
    } else {
        finalPriceAfterDiscount = req.body.totalPrice;

    }
    req.body.finalPrice = finalPriceAfterDiscount;
    req.body.userId = req.user._id;
    req.body.products = finalProducts;
    const order = await create({ model: orderModel, data: req.body })
    if (!order) {
        return next(new Error("failed to place the order", { cause: 400 }))
    }
    if (couponId) {
        await updateOne({ model: couponModel, condition: { couponId }, data: { $addToSet: { usedBy: req.user._id } } })
    }
    for (const product of products) {
        let currentProduct = await findById({ model: productModel, condition: product.productId })
        let nowStock = currentProduct.stock - product.quantity;
        let newSoldItems = currentProduct.soldItems + product.quantity;
        await findByIdAndUpdate({
            model: productModel,
            condition: product.productId,
            data: { soldItems: product.quantity, stock: nowStock, soldItems: newSoldItems }
        })
    }


    res.status(201).json({ message: "Order is placed", order })
})

export const updateOrder = asyncHandler(async (req, res, next) => {
    let { orderId } = req.params;
    let { products } = req.body;
    const finalProducts = []
    let sumTotalPrice = 0;
    let finalPriceAfterDiscount = 0;
    const order = await findById({ model: orderModel, condition: orderId });
    if (!order) {
        return next(new Error("Order not found", { cause: 404 }))
    }
    for (const product of products) {
        let checkProduct = await findOne({ model: productModel, condition: { _id: product.productId, stock: { $gte: product.quantity } } });
        if (!checkProduct) {
            return next(new Error(`failed to place this order ${product.productId} `, { cause: 400 }));
        }
        product.totalPrice = (product.quantity * checkProduct.finalPrice)
        sumTotalPrice += product.totalPrice;
        finalProducts.push(product)

    }
    req.body.totalPrice = sumTotalPrice;

    if (order.couponId) {
        const coupon = await findOne({ model: couponModel, condition: { _id: order.couponId, usedBy: { $nin: req.user._id } } });
        if (!coupon) {
            return next(new Error("in-valid coupon", { cause: 400 }));
        }
        finalPriceAfterDiscount = req.body.totalPrice - (req.body.totalPrice * (coupon.amount / 100));
    } else {
        finalPriceAfterDiscount = req.body.totalPrice;

    }
    req.body.totalPrice = req.body.totalPrice + order.totalPrice;
    req.body.finalPrice = finalPriceAfterDiscount + order.finalPrice;
    req.body.products = finalProducts;

    await findByIdAndUpdate({ model: orderModel, condition: { _id: orderId }, data: { $push: { products: req.body.products } } })
    const updatedOrder = await findByIdAndUpdate({
        model: orderModel, condition: orderId,
        data: req.body,
        options: { new: true }
    });
    res.status(200).json({ message: "order updated", updatedOrder })
})


export const deleteOrder = asyncHandler(async (req, res, next) => {
    let { id } = req.params;
    const order = await findById({ model: orderModel, condition: { _id: id } });
    if (!order) {
        return next(new Error("order not found", { cause: 404 }))
    }
    const deleted = await findByIdAndDelete({ model: orderModel, condition: { _id: id } });
    res.status(200).json({ message: "Order been deleted", deleted })
})