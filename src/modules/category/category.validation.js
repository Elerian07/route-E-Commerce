import joi from 'joi';

export const addSchema = {
    body: joi.object().required().keys({
        name: joi.string().min(2).max(20).required(),
        image: joi.any(),
        public_id: joi.string()
    })
}

export const findSchema = {
    query: joi.object().required().keys({
        search: joi.string().required()
    })
}

export const deleteSchema = {
    params: joi.object().required().keys({
        id: joi.string().required()
    })
}

export const updateSchema = {
    params: joi.object().required().keys({
        id: joi.string().required()
    }),
    body: joi.object().required().keys({
        name: joi.string().min(2).max(20).required(),
        image: joi.any(),
        public_id: joi.string()
    })
}