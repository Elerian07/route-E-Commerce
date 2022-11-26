import { Router } from "express";
import { validation } from '../../middleware/validation.js';
import { loginSchema, signUpSchema } from './auth.validation.js';
import * as registerControl from './controller/registration.js'
const router = Router()

router.post("/signup", validation(signUpSchema), registerControl.signUp)
router.post("/login", validation(loginSchema), registerControl.login)
router.get("/confirmEmail/:token", registerControl.confirmEmail)
router.get("/refreshToken/:token", registerControl.refresh)

export default router