import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
const router = Router();

router.use(authMiddleware);

router.post('/income', (req: Request, res: Response) => {
  // TODO: store income in DB
  res.json({ message: 'income logged' });
});

router.post('/expense', (req: Request, res: Response) => {
  // TODO: store expense in DB
  res.json({ message: 'expense logged' });
});

export default router;

