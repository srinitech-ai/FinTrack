import { categoryExists } from '../models/category';
import { tagExists } from '../models/tag';
import {
  Transaction,
  createTransaction,
  listTransactions,
  getSummary,
  getMonthlyBreakdown,
} from '../models/transaction';

export async function addTransaction(userId: number, data: Omit<Transaction, 'id' | 'user_id'>) {
  if (data.category_id) {
    const exists = await categoryExists(userId, data.category_id);
    if (!exists) throw new Error('Invalid category');
  }
  if (data.tag_id) {
    const exists = await tagExists(userId, data.tag_id);
    if (!exists) throw new Error('Invalid tag');
  }
  const id = await createTransaction({ ...data, user_id: userId });
  return id;
}

export async function getTransactionsService(
  userId: number,
  opts: { start?: string; end?: string; category?: number },
) {
  return listTransactions(userId, opts);
}

export { getSummary, getMonthlyBreakdown };
