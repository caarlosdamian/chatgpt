import { Router } from 'express';
import {
  createChatHandler,
  getChatHandler,
} from '../controllers/chats.controllers';

const router = Router();

router.post('/', createChatHandler);
router.get('/', getChatHandler);

export default router;
