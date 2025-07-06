import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/index.js';

jest.mock('../src/db.js', () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

const pool = require('../src/db.js').default;

beforeAll(() => {
  process.env.JWT_SECRET = 'testsecret';
});

beforeEach(() => {
  (pool.query as jest.Mock).mockReset();
});

describe('Transactions API', () => {
  const token = jwt.sign({ id: 1, email: 'test@example.com' }, 'testsecret');

  test('valid transaction creation', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce([{ insertId: 1 }]);
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'income', amount: 100, entry_date: '2024-01-01' });
    expect(res.status).toBe(201);
  });

  test('unauthorized access', async () => {
    const res = await request(app).get('/api/transactions');
    expect(res.status).toBe(401);
  });

  test('invalid inputs', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'income', amount: -5, entry_date: '2024-01-01' });
    expect(res.status).toBe(400);
  });
});
