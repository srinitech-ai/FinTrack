import pool from '../db.js';

export async function categoryExists(userId: number, id: number) {
  const [rows] = await pool.query(
    'SELECT id FROM Categories WHERE id = ? AND user_id = ? LIMIT 1',
    [id, userId],
  );
  return (rows as any[]).length > 0;
}
