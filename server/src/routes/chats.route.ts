import { Router } from 'express';
import { createChatHandler } from '../controllers/chats.controllers';

const router = Router();

router.post('/', createChatHandler);

export default router;
