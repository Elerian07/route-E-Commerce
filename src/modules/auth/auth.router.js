import { Router } from "express";
import * as registerControl from './controller/registration.js'
const router = Router()

router.post("/signup", registerControl.signUp)
router.post("/login", registerControl.login)
router.get("/confirmEmail/:token", registerControl.confirmEmail)
router.get("/refreshToken/:token", registerControl.refresh)

export default router