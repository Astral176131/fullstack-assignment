# Backend README

## Overview
A Node.js backend service for user authentication, built with Express, Prisma, and PostgreSQL.

## Features
- User login with email/password
- RESTful API endpoints
- Error handling and validation
- Database integration with Prisma ORM

## Tech Stack
- **Runtime**: Node.js (v18+)
- **Framework**: Express
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: bcrypt for password hashing
- **Validation**: Zod
- **Logging**: Built-in console logging

## Project Structure
```
backend/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── controllers/        # Route handlers
│   │   └── auth.controller.ts
│   ├── routes/             # API routes
│   │   └── auth.route.ts
│   ├── lib/                # Utilities
│   │   └── prisma.ts       # DB client
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── .env.example            # Environment variables template
└── package.json
```

## API Endpoints
### Authentication
- `POST /api/auth/login`
  - Request:
    ```json
    {
      "email": "string",
      "password": "string"
    }
  ```
  - Responses:
    - 200 Success:
      ```json
      {
        "success": true,
        "user": {
          "id": "string",
          "email": "string"
        }
      }
      ```
    - 401 Unauthorized:
      ```json
      {
        "error": "Invalid credentials"
      }
      ```


### Prerequisites
- Node.js v18+
- PostgreSQL database
- Prisma CLI (`npm install -g prisma`)

### Installation

1. Clone the repository
2. Install dependencies:
   npm install
3. Set up environment variables:
   cp .env.example .env
   Edit `.env` with your database credentials:
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   PORT=3000
   

4. Set up database:
   npx prisma migrate dev --name init
   

### Running the Server

- Development:
  npm run dev

- Production:
  npm run build
  npm start


## Database Schema

model User {
  id       String @id @default(uuid())
  email    String @unique
  password String
  // Add other fields as needed
}


## Testing

Run integration tests:
npm test

## Deployment

1. Build the project:
   npm run build
2. Start the server:
   npm start


## Troubleshooting

- **Database connection issues**: Verify `DATABASE_URL` in `.env`
- **401 Unauthorized errors**: Check user exists and password matches
- **Prisma errors**: Run `npx prisma generate` after schema changes