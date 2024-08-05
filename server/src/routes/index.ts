import express from 'express';
import filesRouter from './files.route';

const router = express.Router();

router.use('/api/files/', filesRouter);

export default router;
