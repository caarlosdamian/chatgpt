import { Request, Response, Router } from 'express';

const router = Router();

router.get('/healtcheck', (req: Request, res: Response) => {
  res.json({message:'Success'})
});

export default router;
