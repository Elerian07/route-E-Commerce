import { Router } from "express";
import * as subcategoryController from './controller/subcategory.controller.js';
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { fileValidation, myMulter, HME } from "../../services/multer.js";
import { addSchema, deleteSchema, findSchema, updateSchema } from './subcategory.validation.js';
const router = Router({ mergeParams: true })


router.post("/", validation(addSchema), auth(), myMulter(fileValidation.image).single("image"), HME, subcategoryController.addSubcategory)

router.delete("/:subId", validation(deleteSchema), auth(), subcategoryController.deleteSubcategory)

router.get("/", validation(findSchema), auth(), subcategoryController.findSubcategory)
router.put("/:subId", validation(updateSchema), auth(), myMulter(fileValidation.image).single("image"), HME, subcategoryController.updateSubcategory)

export default router