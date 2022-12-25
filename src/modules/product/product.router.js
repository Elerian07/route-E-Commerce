import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from '../../middleware/validation.js';
import { fileValidation, myMulter, HME } from "../../services/multer.js";
import wishListRouter from "../wishList/wishList.router.js";
import * as productController from './controller/product.controller.js';
import { endPoints } from "./product.endPoint.js";
import { addSchema, updateSchema } from "./product.validation.js";
const router = Router()

router.use("/:productId/wishList", wishListRouter)

router.post("/:categoryId/:subcategoryId/:brandId", validation(addSchema), auth(endPoints.addProduct), myMulter(fileValidation.image).array("image", 7), HME, productController.addProduct)
router.put("/:id", validation(updateSchema), auth(endPoints.updateProduct), myMulter(fileValidation.image).array("image", 7), HME, productController.updateProduct)

router.get("/", productController.getAllProducts)

router.delete("/:id", auth(endPoints.deleteProduct), productController.deleteProduct)


export default router