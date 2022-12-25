import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./reviews.endPoint.js";
import { validation } from '../../middleware/validation.js';
import { addReviewSchema, updateReviewSchema } from "./reviews.validation.js";
import * as reviewController from './controller/reviews.controller.js'
const router = Router()



router.get('/', reviewController.allReviews)
router.post('/', auth(endpoints.createReview), validation(addReviewSchema), reviewController.createReview)
router.put('/:id', auth(endpoints.updateReview), validation(updateReviewSchema), reviewController.updateReview)
router.delete('/:id', auth(endpoints.deleteReview), reviewController.deleteReview)



export default router