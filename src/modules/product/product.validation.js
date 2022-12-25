import joi from "joi";


export const addSchema = {
    body: joi.object().required().keys({
        name: joi.string().min(2).max(20),
        description: joi.string().min(2).max(20),
        colors: joi.string(),
        size: joi.string(),
        price: joi.number(),
        totalItems: joi.number(),
        image: joi.any(),
        public_id: joi.string()
    })
}


export const updateSchema = {
    name: joi.string().min(2).max(20),
    description: joi.string().min(2).max(20),
    colors: joi.string(),
    size: joi.string(),
    price: joi.number(),
    totalItems: joi.number(),
    image: joi.any(),
    public_id: joi.string()
}