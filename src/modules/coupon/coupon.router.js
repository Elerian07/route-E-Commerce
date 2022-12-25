import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./coupon.endPoint.js";
import * as couponController from './controller/coupon.controller.js';
import { validation } from '../../middleware/validation.js';
import { addCouponSchema, stopCouponSchema, updateCouponSchema } from "./coupon.validation.js";

const router = Router()


router.post("/", validation(addCouponSchema), auth(endpoints.create), couponController.addCoupon)

router.put("/:named", validation(updateCouponSchema), auth(endpoints.create), couponController.updateCoupon)
router.put("/stopCoupon/:couponId", validation(stopCouponSchema), auth(endpoints.create), couponController.stopCoupon)



export default router