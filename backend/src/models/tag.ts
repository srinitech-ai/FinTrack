import pool from '../db';

export async function tagExists(userId: number, id: number) {
  const [rows] = await pool.query(
    'SELECT id FROM Tags WHERE id = ? AND user_id = ? LIMIT 1',
    [id, userId],
  );
  return (rows as any[]).length > 0;
}
