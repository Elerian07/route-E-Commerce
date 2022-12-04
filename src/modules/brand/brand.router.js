import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from '../../middleware/validation.js';
import { fileValidation, myMulter, HME } from "../../services/multer.js";
import { endPoints } from "./brand.endPoint.js";
import * as brandController from './controller/brand.controller.js';
import { addSchema, deleteSchema, findSchema, updateSchema } from './brand.validation.js';
const router = Router()

router.post("/", validation(addSchema), auth(endPoints.addBrand), myMulter(fileValidation.image).single("image"), HME, brandController.addBrand)
router.put("/:_id", validation(updateSchema), auth(endPoints.updatedBrand), myMulter(fileValidation.image).single("image"), HME, brandController.updateBrand)
router.delete("/:id", validation(deleteSchema), auth(endPoints.deleteBrand), brandController.deleteBrand)
router.get("/", validation(findSchema), auth(endPoints.findBrand), brandController.findBrand)




export default router