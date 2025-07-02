import { Router } from 'express';
const router = Router();

router.post('/login', (req, res) => {
  // TODO: implement login logic
  res.json({ token: 'dummy-token' });
});

router.post('/register', (req, res) => {
  // TODO: implement registration logic
  res.json({ message: 'user created' });
});

export default router;

