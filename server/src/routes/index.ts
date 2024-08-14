import express from 'express';
import filesRouter from './files.route';
import healtRouter from './healt.route';
import chatsRouter from './chats.route';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const router = express.Router();
router.use(ClerkExpressRequireAuth({}));
router.use((req,res,next)=>{
  console.log('Entrando')
  next()
})
router.use('/api/files/', filesRouter);
router.use('/api/healt/', healtRouter);
router.use('/api/chats/', chatsRouter);

export default router;
