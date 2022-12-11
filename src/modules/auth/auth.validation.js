import joi from 'joi';

export const signUpSchema = {
    body: joi.object().required().keys({
        userName: joi.string().min(4).max(10).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi.string().pattern(new RegExp('^[A-Za-z0-9]{3,30}$')).required(),
        // cPassword: joi.string().valid(joi.ref("password")).required(),
        cPassword: joi.string().valid(joi.ref("password")).required()
    })
}

export const loginSchema = {
    body: joi.object().required().keys({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi.string().pattern(new RegExp('^[A-Za-z0-9]{3,30}$')).required(),
    })
}