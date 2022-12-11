import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./user.endPoint.js";
import * as userController from './controller/user.controller.js';
import { validation } from '../../middleware/validation.js';
import { restPass, deleteSchema } from './user.validation.js';
import { myMulter, fileValidation, HME } from '../../services/multer.js';

const router = Router()




router.get('/', (req, res) => {
    res.status(200).json({ message: "User Module" })
})

router.post("/changePass", auth(endpoints.changePassword), validation(restPass), userController.changePassword)
router.delete("/deleteUser/:id", auth(endpoints.deleteUser), validation(deleteSchema), userController.deleteById)
router.put("/updateUser", auth(endpoints.updateUser), myMulter(fileValidation.image).single("image"), HME, userController.updateUser)


export default router