import { model } from 'mongoose';
import userModel from './model/User.model.js';
import categoryModel from './model/category.model.js';
// find
export const find = async (model, condition, select, limit = 10, skip = 0, populate = []) => {
    let data = await model.findOne(condition).skip(skip).limit(limit).select(select).populate(populate);
    return data
}
export const findOne = async (model, condition, select, populate = []) => {
    let data = await model.findOne(condition).select(select).populate(populate);
    return data
}
export const findById = async (model, condition = {}, select, populate = []) => {
    let data = await model.findById(condition).select(select).populate(populate);
    return data
}
export const findByIdAndUpdate = async ({ model, condition, data, options } = {}) => {
    const result = await model.findByIdAndUpdate({ condition, data, options });
    return result;
}
export const findOneAndUpdate = async ({ model, condition, data, options } = {}) => {
    const result = await model.findByIdAndUpdate({ condition, data, options });
    return result;
}
export const findByIdAndDelete = async (model, condition = {}) => {
    const result = await model.findByIdAndDelete(condition);
    return result;
}

//insert
export const create = async (model, data, condition, select, limit = 10, skip = 0) => {
    let newModel = await new model(data);
    let result = await newModel.save();
    return result
}

export const insertMany = async (model, data, select, populate = []) => {
    let result = await model.insertMany(data);
    return result
}

// update

export const updateOne = async (model, condition = {}, data = {}, options = {}) => {
    const result = await model.updateOne(condition, data, options);
    return result;
}

//delete

export const deleteOne = async ({ model, condition = {}, filter = {} } = {}) => {
    const deleted = await model.deleteOne(condition, filter);
    return deleted;
}