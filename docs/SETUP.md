# Developer Setup Guide

This guide explains how to run each service in development.

1. **Clone the repo**
   ```bash
   git clone https://github.com/srinitech-ai/FinTrack.git
   cd FinTrack
   ```
2. **Install Node.js and Python 3.11**

3. **Install root development tools (husky, lint-staged)**
   ```bash
   npm install
   ```

4. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

5. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The API will run on `http://localhost:3001`.

6. **AI service**
   ```bash
   cd ai
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
   Access AI endpoints at `http://localhost:8000`.

7. **Using Docker**
   ```bash
   cd docker
   docker-compose up --build
   ```
   This will start the frontend, backend, AI service and a MySQL database.

