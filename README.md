# FinTrack

FinTrack is a personal finance tracker that provides AI-powered insights. The
project consists of a React frontend, a Node.js backend and a Python service
for generating insights.

## Local Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```

### AI Service
```bash
cd ai
pip install -r requirements.txt
uvicorn main:app --reload
```

### With Docker
```bash
cd docker
docker-compose up --build
```

## API Overview
- `POST /api/auth/login` – log in a user and return a JWT.
- `POST /api/auth/register` – create a new user.
- `POST /api/transactions/income` – log an income entry.
- `POST /api/transactions/expense` – log an expense entry.
- `POST /insights` – generate AI powered insights.

For more details see `docs/SETUP.md`.

