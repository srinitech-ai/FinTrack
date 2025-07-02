import { Router } from 'express';
const router = Router();

router.post('/income', (req, res) => {
  // TODO: store income in DB
  res.json({ message: 'income logged' });
});

router.post('/expense', (req, res) => {
  // TODO: store expense in DB
  res.json({ message: 'expense logged' });
});

export default router;

