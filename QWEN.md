# TypeScript Transaction Exercise - Project Context

## Project Overview

This is a **Transaction API** project built with TypeScript and Express.js. The goal is to create a read-only REST API that serves transaction data from a static CSV file. The API supports filtering, sorting, and sparse field selection for efficient data retrieval.

### Key Technologies
- **Language**: TypeScript
- **Framework**: Express.js
- **Data Source**: CSV file (`data/data.csv`)
- **Testing**: Mocha, Chai, Sinon
- **Build System**: TypeScript compiler (tsc)

### Architecture
The application follows a clean architecture pattern with:
- **Controllers** (`src/controllers/transaction.ts`): Handle HTTP requests and responses
- **Repositories** (`src/repositories/transaction.ts`): Manage data access and business logic
- **Models** (`src/models/transaction.ts`): Define data structures
- **Routes** (`src/routes/index.ts`): Define API endpoints
- **Middlewares** (`src/middlewares/success_handler.ts`): Handle response formatting

## API Endpoints

### GET `/transactions`
- Lists all transactions with optional filtering and sorting
- Query parameters:
  - Filtering: `?tags=Dining,Travel&counterparty=Google` (supports multiple field filters)
  - Sorting: `?sort=counterparty` (supports sorting by id, account, amount, counterparty, date, location)

### GET `/transactions/:id`
- Retrieves a single transaction by ID
- Query parameters:
  - Sparse fields: `?fields=amount,tags` (returns only specified fields)

## Data Model

The transaction data structure includes:
```typescript
interface Transaction {
  id?: number;
  account?: string;
  amount?: string;
  counterparty?: string;
  tags?: string[];  // Array of tag strings
  date?: string;
  location?: string;
}
```

## Building and Running

### Prerequisites
- Node.js 18+

### Setup
1. Clone the repository
2. Copy environment variables: `cp .env.example .env`
3. Install dependencies: `npm install`

### Development
- Compile and watch: `npm run dev`
- This runs TypeScript compiler in watch mode and restarts the server with nodemon

### Production
- Compile: `npm run build`
- Start: `npm start`

### Testing
- Run tests: `npm test`
- Uses Mocha for test runner, Chai for assertions, and Sinon for mocking

## Key Features

### Filtering
Supports filtering transactions by any field (id, account, amount, counterparty, tags, date, location) using query parameters.

### Sorting
Supports sorting by multiple fields: id, account, amount, counterparty, date, location.

### Sparse Field Selection
Allows clients to request only specific fields to reduce payload size and improve performance.

### Error Handling
Proper error handling with appropriate HTTP status codes (e.g., 404 for not found).

## File Structure
```
src/
├── app.ts              # Main application entry point
├── controllers/        # Request handlers
├── middlewares/        # Middleware functions
├── models/             # Data models
├── repositories/       # Data access layer
└── routes/             # API route definitions
data/
└── data.csv           # Static transaction data source
test/
└── unit/              # Unit tests
```

## Development Conventions

- TypeScript with strict mode enabled
- Express.js routing patterns
- Repository pattern for data access
- Separation of concerns between controllers and repositories
- Comprehensive unit testing with mock objects
- Environment variable configuration via .env file

## Testing Strategy

The project includes comprehensive unit tests covering:
- Controller methods (list and get transaction)
- Valid field validation for sorting and sparse fields
- Error handling scenarios
- Different combinations of field 
