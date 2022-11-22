import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import * as categoryController from './controller/category.controller.js';
const router = Router()



router.post("/", auth(), myMulter(fileValidation.image).single("image"), categoryController.addCategory)



export default router