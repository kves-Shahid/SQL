import express from 'express';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById
} from '../controllers/courseController.js';

import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes are protected with JWT
router.use(authenticate);

// Create a course
router.post('/create', createCourse);

// Get all published courses
router.get('/', getAllCourses);

// Get a specific course by ID
router.get('/:course_id', getCourseById);

// Update a course by ID
router.put('/:course_id', updateCourse);

// Delete a course by ID
router.delete('/:course_id', deleteCourse);

export default router;
