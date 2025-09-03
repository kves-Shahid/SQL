// backend/routes/chatRoutes.js
import express from 'express';
import { postMessage, getMessagesByModule } from '../controllers/chatController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All chat routes require authentication
router.use(authenticate);

// Send a chat message
router.post('/send', postMessage);


router.get('/:module_id', getMessagesByModule);

export default router;
