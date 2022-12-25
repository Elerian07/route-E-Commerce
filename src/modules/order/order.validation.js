import Joi from "joi";



export const addOrderSchema = {
    body: Joi.object().required().keys({
        address: Joi.string().required(),
        Phone: Joi.string().required(),
        products: Joi.array().required()
    })
}
export const updateOrderSchema = {
    body: Joi.object().required().keys({
        address: Joi.string(),
        Phone: Joi.string(),
        products: Joi.array()
    })
}
