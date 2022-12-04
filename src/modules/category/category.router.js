import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from '../../middleware/validation.js';
import { fileValidation, myMulter, HME } from "../../services/multer.js";
import subcategoryRouter from "../subcategory/subcategory.router.js";
import { addSchema, deleteSchema, findSchema, updateSchema } from "./category.validation.js";
import * as categoryController from './controller/category.controller.js';
import { endPoints } from '../category/category.endPoint.js';

const router = Router()

router.use("/:id/subcategory", subcategoryRouter)


router.post("/", validation(addSchema), auth(endPoints.addCategory), myMulter(fileValidation.image).single("image"), HME, categoryController.addCategory)

router.get("/", validation(findSchema), auth(), categoryController.findCategory)

router.delete("/:id", validation(deleteSchema), auth(endPoints.deleteCategory), categoryController.deleteCategory)

router.put("/:_id", validation(updateSchema), auth(endPoints.updateCategory), myMulter(fileValidation.image).single("image"), HME, categoryController.updateCategory)
export default router