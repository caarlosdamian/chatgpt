import { Router } from 'express';
import {
  createChatHandler,
  getChatHandler,
  getChatsHandler,
  updateChatHandler,
} from '../controllers/chats.controllers';

const router = Router();

router.post('/', createChatHandler);
router.get('/:id', getChatHandler);
router.put('/:id', updateChatHandler);
router.get('/', getChatsHandler);

export default router;
