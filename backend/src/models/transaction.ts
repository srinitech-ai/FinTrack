import pool from '../db.js';

export interface Transaction {
  id?: number;
  user_id: number;
  type: 'income' | 'expense';
  amount: number;
  category_id?: number | null;
  tag_id?: number | null;
  notes?: string | null;
  entry_date: string; // ISO date string
}

export async function createTransaction(tx: Transaction) {
  const [result] = await pool.query(
    'INSERT INTO Transactions (user_id, type, amount, category_id, tag_id, notes, entry_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      tx.user_id,
      tx.type,
      tx.amount,
      tx.category_id ?? null,
      tx.tag_id ?? null,
      tx.notes ?? null,
      tx.entry_date,
    ],
  );
  return (result as any).insertId as number;
}

export async function listTransactions(
  userId: number,
  opts: { start?: string; end?: string; category?: number },
) {
  let query = 'SELECT * FROM Transactions WHERE user_id = ?';
  const params: any[] = [userId];
  if (opts.category) {
    query += ' AND category_id = ?';
    params.push(opts.category);
  }
  if (opts.start) {
    query += ' AND entry_date >= ?';
    params.push(opts.start);
  }
  if (opts.end) {
    query += ' AND entry_date <= ?';
    params.push(opts.end);
  }
  query += ' ORDER BY entry_date DESC';
  const [rows] = await pool.query(query, params);
  return rows as Transaction[];
}

export async function getSummary(userId: number) {
  const [rows] = await pool.query(
    `SELECT
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expenses
    FROM Transactions WHERE user_id = ?`,
    [userId],
  );
  const row = (rows as any)[0] || { income: 0, expenses: 0 };
  return {
    income: Number(row.income) || 0,
    expenses: Number(row.expenses) || 0,
    savings: (Number(row.income) || 0) - (Number(row.expenses) || 0),
  };
}

export async function getMonthlyBreakdown(userId: number, month: string) {
  const [rows] = await pool.query(
    `SELECT c.name as category, SUM(t.amount) as total
     FROM Transactions t
     LEFT JOIN Categories c ON t.category_id = c.id
     WHERE t.user_id = ? AND DATE_FORMAT(t.entry_date, '%Y-%m') = ?
     GROUP BY c.name`,
    [userId, month],
  );
  return rows as { category: string; total: number }[];
}
