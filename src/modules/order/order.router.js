import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./order.endPoint.js";
import * as orderController from './controller/order.controller.js';
import { validation } from '../../middleware/validation.js';
import { addOrderSchema, updateOrderSchema } from "./order.validation.js";
const router = Router()


router.post("/", validation(addOrderSchema), auth(endpoints.createOrder), orderController.createOrder)
router.put("/:orderId", validation(updateOrderSchema), auth(endpoints.updateOrder), orderController.updateOrder)
router.delete("/:id", auth(endpoints.deleteOrder), orderController.deleteOrder)



export default router