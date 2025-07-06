import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  // TODO: implement login logic
  res.json({ token: 'dummy-token' });
});

router.post('/register', (req: Request, res: Response) => {
  // TODO: implement registration logic
  res.json({ message: 'user created' });
});

export default router;

