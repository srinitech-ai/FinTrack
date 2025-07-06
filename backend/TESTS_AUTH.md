# Suggested Test Cases for Authentication Routes

The backend can be tested using Jest and Supertest. Below are example cases:

1. **Registration Success**
   - POST `/api/auth/register` with a valid email and password
   - Expect `201` status and message `user created`
   - Verify user exists in database

2. **Registration Validation Failure**
   - Missing or invalid email/password
   - Expect `400` status with validation error details

3. **Duplicate Registration**
   - Register a user, then register again with the same email
   - Expect `409` status and appropriate message

4. **Login Success**
   - POST `/api/auth/login` with correct credentials
   - Expect `200` status and a JWT token in response

5. **Login Failure**
   - Incorrect password or unknown email
   - Expect `401` status

6. **JWT Protected Route**
   - Call a protected endpoint (e.g. `/api/transactions/income`)
   - Without token → expect `401`
   - With valid token → expect success response

Use Supertest to issue HTTP requests to the Express app and Jest assertions to verify responses.
