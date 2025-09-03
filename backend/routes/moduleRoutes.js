import express from 'express';
import { createModule, getModulesByCourse } from '../controllers/moduleController.js';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Instructor only can create modules
router.post('/create', authenticate, authorizeRoles('instructor'), createModule);

// Get modules for a course
router.get('/course/:courseId', authenticate, getModulesByCourse);

export default router;
