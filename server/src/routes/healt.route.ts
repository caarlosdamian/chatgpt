import { Request, Response, Router } from 'express';

const router = Router();

router.get('/healtcheck', (req: Request, res: Response) => {
  // console.log(req);
  res.json({message:'Success'})
});

export default router;
