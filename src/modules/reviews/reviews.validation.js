import joi from 'joi';

export const addReviewSchema = {
    authorization: joi.object().required().keys({
        text: joi.string().required(),

        addBy: joi.object().required(),
        productId: joi.object().required(),
        rating: joi.string().required(),
    })
}

export const updateReviewSchema = {
    authorization: joi.object().required().keys({
        text: joi.string().required(),
        rating: joi.string().required(),
    })
}