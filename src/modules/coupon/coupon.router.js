import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./coupon.endPoint.js";
import * as couponController from './controller/coupon.controller.js';
const router = Router()


router.post("/", auth(endpoints.create), couponController.addCoupon)

router.put("/:named", auth(endpoints.create), couponController.updateCoupon)
router.put("/stopCoupon/:couponId", auth(endpoints.create), couponController.stopCoupon)



export default router