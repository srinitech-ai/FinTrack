import { Router, Request, Response } from 'express';
const router = Router();

router.post('/income', (req: Request, res: Response) => {
  // TODO: store income in DB
  res.json({ message: 'income logged' });
});

router.post('/expense', (req: Request, res: Response) => {
  // TODO: store expense in DB
  res.json({ message: 'expense logged' });
});

export default router;

