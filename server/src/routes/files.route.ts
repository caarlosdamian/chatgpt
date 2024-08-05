import { Router } from 'express';
import { uploadFileHandler } from '../controllers/files.controllers';

const router = Router();

router.get('/upload', uploadFileHandler);

export default router;
