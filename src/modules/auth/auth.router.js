import { Router } from "express";
import { validation } from '../../middleware/validation.js';
import { endPoints } from "./auth.endPoint.js";
import { loginSchema, signUpSchema } from './auth.validation.js';
import * as registerControl from './controller/registration.js';
import { auth } from "../../middleware/auth.js";
const router = Router()

router.post("/signup", validation(signUpSchema), registerControl.signUp)
router.post("/login", validation(loginSchema), registerControl.login)
router.get("/confirmEmail/:token", registerControl.confirmEmail)
router.get("/refreshToken/:token", registerControl.refresh)
router.put("/updateRole", auth(endPoints.updateRole), registerControl.updateRole)

export default router