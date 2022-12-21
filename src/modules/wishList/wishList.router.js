import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../services/asyncHandler.js";
import { endpoints } from "./wishList.endpoints.js";
import * as wishListController from './controller/wishList.controller.js';
const router = Router({ mergeParams: true })



router.put("/", auth(endpoints.create), wishListController.addWishList)
router.put("/remove", auth(endpoints.remove), wishListController.removeWishList)



export default router