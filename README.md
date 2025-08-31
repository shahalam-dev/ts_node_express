# TypeScript Express API

A modern REST API built with TypeScript, Express.js, and Prisma ORM, featuring a clean layered architecture and comprehensive error handling.

## Features

- **TypeScript** - Full type safety and modern JavaScript features
- **Express.js** - Fast, unopinionated web framework
- **Prisma ORM** - Type-safe database client with PostgreSQL
- **Zod** - Runtime type validation
- **ESLint + Prettier** - Code linting and formatting
- **Morgan** - HTTP request logging
- **CORS** - Cross-origin resource sharing enabled
- **Graceful Shutdown** - Proper server shutdown handling

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Dev Tools**: tsx, ESLint, Prettier

## Project Structure

```
src/
├── config/
│   └── config.ts           # Environment configuration
├── controllers/
│   └── user.controller.ts  # Business logic handlers
├── middlewares/
│   ├── error-handler.middleware.ts  # Global error handling
│   ├── not-found.middleware.ts      # 404 handler
│   └── validator.middleware.ts      # Request validation
├── routes/
│   └── v1/
│       ├── index.ts        # Route aggregation
│       └── user.routes.ts  # User endpoints
├── utils/
│   ├── format-zod-error.ts # Zod error formatting
│   └── response.ts         # Standardized API responses
├── validators/
│   └── user.validator.ts   # Zod validation schemas
├── generated/
│   └── prisma/             # Generated Prisma client
├── app.ts                  # Express app setup
├── server.ts               # HTTP server initialization
└── prisma.ts               # Prisma client instance

prisma/
└── schema.prisma           # Database schema definition
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure your `.env` file:
   ```env
   NODE_ENV=development
   PORT=5500
   DATABASE_URL="postgresql://username:password@localhost:5432/database"
   ```

4. Set up the database:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5500`

## Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
```

### Build & Production
```bash
npm run build        # Compile TypeScript to dist/
npm start           # Run production server
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Database
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma studio    # Open database GUI
npx prisma migrate dev  # Create and apply migrations
```

## API Endpoints

### Base URL
```
http://localhost:5500/api/v1
```

### Available Routes
- `GET /` - Welcome message and API version
- `GET /api/v1/users` - Get all users
- `POST /api/v1/users` - Create a new user
- `GET /fail` - Example error endpoint

### Response Format
All API responses follow a consistent structure:

```json
{
  "success": true,
  "message": "Request successful",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Architecture

### Layered Architecture
The application follows a clean layered architecture:

1. **Routes Layer** - HTTP endpoint definitions and routing
2. **Controller Layer** - Business logic and request handling
3. **Service Layer** - Data access and business operations
4. **Database Layer** - Prisma ORM and PostgreSQL

### Middleware Stack
- **CORS** - Enabled for all origins
- **Body Parser** - JSON request parsing
- **Morgan** - HTTP request logging
- **Error Handler** - Centralized error handling
- **Validator** - Request validation using Zod schemas

### Error Handling
- Custom `ApiError` class for structured errors
- Global error handler middleware
- Proper HTTP status codes
- Detailed error messages in development

### Validation
- Runtime type checking with Zod
- Request body validation middleware
- Formatted validation error responses

## Database

The application uses PostgreSQL with Prisma ORM:

### Current Models
```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

### Database Operations
- Generated Prisma client with full type safety
- Custom output directory: `src/generated/prisma/`
- Migrations and schema management via Prisma CLI

## Development

### Code Style
- ESLint with TypeScript support
- Prettier for code formatting
- Strict TypeScript configuration
- ES modules enabled

### Environment Variables
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5500)
- `DATABASE_URL` - PostgreSQL connection string

### Hot Reload
Development server uses `tsx` with watch mode for instant TypeScript compilation and server restart.

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables

3. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Contributing

1. Follow the existing code style and architecture
2. Run linting and formatting before committing
3. Add appropriate error handling and validation
4. Update documentation for new features

## License

ISC