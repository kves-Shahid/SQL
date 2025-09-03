import express from 'express';
import {
  getLessonsByModule,
  getLessonContent,
  createLesson
} from '../controllers/lessonController.js';
import { authenticate, authorizeInstructor } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Instructor-only route to create lesson
router.post('/create', authorizeInstructor, createLesson);

// Get all lessons for a module
router.get('/module/:moduleId', getLessonsByModule);

// Get a single lesson content
router.get('/:lessonId', getLessonContent);

export default router;
