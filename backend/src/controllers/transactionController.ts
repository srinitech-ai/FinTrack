import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth.js';
import {
  addTransaction,
  getTransactionsService,
  getSummary,
  getMonthlyBreakdown,
} from '../services/transactionService.js';

export async function createTransactionHandler(req: AuthRequest, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = await addTransaction(req.user!.id, req.body);
    res.status(201).json({ id });
  } catch (err: any) {
    if (err.message === 'Invalid category' || err.message === 'Invalid tag') {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function listTransactionsHandler(req: AuthRequest, res: Response) {
  try {
    const data = await getTransactionsService(req.user!.id, {
      start: req.query.start as string | undefined,
      end: req.query.end as string | undefined,
      category: req.query.category ? Number(req.query.category) : undefined,
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function summaryHandler(req: AuthRequest, res: Response) {
  try {
    const data = await getSummary(req.user!.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function monthlyHandler(req: AuthRequest, res: Response) {
  const month = (req.query.month as string) || new Date().toISOString().slice(0, 7);
  try {
    const data = await getMonthlyBreakdown(req.user!.id, month);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
