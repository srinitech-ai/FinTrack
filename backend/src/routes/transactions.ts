import { Router } from 'express';
import { body, query } from 'express-validator';
import { authMiddleware } from '../middleware/auth';
import {
  createTransactionHandler,
  listTransactionsHandler,
  summaryHandler,
  monthlyHandler,
} from '../controllers/transactionController';

const router = Router();
router.use(authMiddleware);

router.post(
  '/',
  body('type').isIn(['income', 'expense']),
  body('amount').isFloat({ gt: 0 }),
  body('category_id').optional().isInt(),
  body('tag_id').optional().isInt(),
  body('notes').optional().isString(),
  body('entry_date').isISO8601(),
  createTransactionHandler,
);

router.get(
  '/',
  query('start').optional().isISO8601(),
  query('end').optional().isISO8601(),
  query('category').optional().isInt(),
  listTransactionsHandler,
);

router.get('/summary', summaryHandler);
router.get('/monthly', monthlyHandler);

export default router;
