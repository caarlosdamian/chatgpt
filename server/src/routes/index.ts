import express from 'express';
import filesRouter from './files.route';
import chatsRouter from './chats.route';

const router = express.Router();

router.use('/api/files/', filesRouter);
router.use('/api/chats/', chatsRouter);

export default router;
