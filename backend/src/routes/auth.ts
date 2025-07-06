import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const router = Router();

router.post(
  '/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body as { email: string; password: string };
    try {
      const [rows] = await pool.query(
        'SELECT id, password_hash FROM Users WHERE email = ? LIMIT 1',
        [email],
      );
      if ((rows as any[]).length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const user = (rows as any)[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { id: user.id, email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' },
      );
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
);

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body as { email: string; password: string };
    try {
      const [exists] = await pool.query('SELECT id FROM Users WHERE email = ?', [
        email,
      ]);
      if ((exists as any[]).length > 0) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      const hash = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO Users (email, password_hash) VALUES (?, ?)',
        [email, hash],
      );
      res.status(201).json({ message: 'user created' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
);

export default router;

