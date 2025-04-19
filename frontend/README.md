# Frontend README

# React Login Frontend

A modern login interface built with React, TypeScript, and React Hook Form.

## Features

- Email/UID and password validation
- Responsive design
- Error handling with toast notifications
- Form state management with React Hook Form
- Type-safe with TypeScript

## Available Scripts

- npm start: Runs the app in development mode
- npm test: Launches the test runner
- npm run build: Builds for production
- npm run lint: Runs ESLint
- npm run format: Formats code with Prettier

## Development Setup

1. Start the development server:
   npm start

2. The app will open at [http://localhost:3000](http://localhost:3000)

## Connecting to Backend

The frontend expects a backend running at `http://localhost:3000` with these endpoints:

- `POST /api/auth/login`
  - Request body:
    json
    {
      "email": "string",
      "password": "string"
    }
  - Successful response:
    json
    {
      "success": true,
      "user": {
        "id": "string",
        "email": "string"
      }
    }

## Dependencies

- React 18
- TypeScript
- React Hook Form
- Zod (validation)
- React Toastify (notifications)
- Tailwind CSS (styling)

## Troubleshooting

If you encounter a 401 Unauthorized error:
1. Verify the backend is running
2. Check the email/password in your database
3. Inspect network requests in browser DevTools

For other issues, check the console logs and backend logs.

## Tech Stack

Core
React (v18) - UI framework
TypeScript - Type safety
Vite - Build tool (or Create-React-App if used)

Form & Validation
React Hook Form - Form state management
Zod - Schema validation

Styling
Tailwind CSS - Utility-first CSS
CSS Modules (optional) - Component-scoped styles

Extras
React Toastify - Notification toasts
Axios (optional) - HTTP client

## Project Structure

src/
├── components/            # Reusable components
│   └── LoginForm.tsx      # Login form logic & UI
├── styles/                # Global styles
│   ├── index.css          # Tailwind/global CSS  
│   └── variables.css      # CSS variables (optional)
├── types/                 # Type definitions
│   └── auth.ts            # Auth-related types  
├── utils/                 # Helper functions
│   └── api.ts             # API request handlers  
├── App.tsx                # Root component
└── main.tsx               # Entry point

## Key Files:
LoginForm.tsx: Handles form submission, validation, and error states.

auth.ts: Defines TypeScript interfaces (e.g., LoginFormData).

api.ts: Centralized API calls (if using Axios).
