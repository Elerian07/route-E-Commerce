import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./cart.endPoint.js";
import * as cartController from './controller/cart.controller.js';
const router = Router()


router.post("/", auth(endpoints.create), cartController.createCart)




export default router