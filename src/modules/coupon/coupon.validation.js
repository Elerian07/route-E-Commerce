import Joi from "joi";



export const addCouponSchema = {
    body: Joi.object().required().keys({
        name: Joi.string().min(2).max(20),
        amount: Joi.number().required().min(1).max(100),
        expireIn: Joi.date().required()
    })
}
export const updateCouponSchema = {
    body: Joi.object().required().keys({
        name: Joi.string().min(2).max(20),
        amount: Joi.number().required().min(1).max(100),
        expireIn: Joi.date().required()
    })
}
export const stopCouponSchema = {
    body: Joi.object().required().keys({
        couponId: Joi.string().required(),

    })
}