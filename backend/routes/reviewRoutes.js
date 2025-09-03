
import express from 'express';
import {
  submitReview,
  getReviewsByCourse
} from '../controllers/reviewController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);
router.post('/create', submitReview);
router.get('/:courseId', getReviewsByCourse);

export default router;
