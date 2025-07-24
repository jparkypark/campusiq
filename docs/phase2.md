# Phase 2: Backend API Development - Execution Plan

## Overview
Phase 2 focuses on building the backend API infrastructure with SQLite database, external API integrations, and REST endpoints. This phase establishes the data layer and API services that will power the frontend.

## Prerequisites
- Phase 1 completed (monorepo setup with packages/backend and packages/frontend)
- Node.js backend with Express.js and TypeScript configured
- API keys available for NewsAPI, OpenWeatherMap, and Tiingo

## Phase 2 Tasks Breakdown

### Task 2.1: SQLite Database Setup
**Objective**: Initialize SQLite database with better-sqlite3 and create schema

**Implementation Steps**:
1. Install better-sqlite3 and @types/better-sqlite3
2. Create `packages/backend/src/database/` directory structure
3. Implement database connection and initialization
4. Create migration system for schema management
5. Define tables: `news`, `weather`, `stocks`
6. Add database seeding utilities

**Files to Create**:
- `packages/backend/src/database/connection.ts`
- `packages/backend/src/database/migrations/001_initial.sql`
- `packages/backend/src/database/seed.ts`

**Acceptance Criteria**:
- Database file created and accessible
- All tables created with proper schema
- Connection pooling configured
- Migration system functional

### Task 2.2: TypeScript Models & Interfaces
**Objective**: Create strongly-typed models for News, Weather, and Stocks

**Implementation Steps**:
1. Create `packages/backend/src/types/` directory
2. Define News interface with required fields
3. Define Weather interface with location and temperature data
4. Define Stocks interface for company and price data
5. Create shared utility types and enums
6. Add validation schemas using Zod

**Files to Create**:
- `packages/backend/src/types/news.ts`
- `packages/backend/src/types/weather.ts`
- `packages/backend/src/types/stocks.ts`
- `packages/backend/src/types/index.ts`

**Acceptance Criteria**:
- All models properly typed
- Validation schemas implemented
- Import/export structure clean
- Compatible with database schema

### Task 2.3: NewsAPI Service Integration
**Objective**: Implement NewsAPI service with axios/fetch

**Implementation Steps**:
1. Create `packages/backend/src/services/` directory
2. Install axios for HTTP requests
3. Implement NewsAPI client with error handling
4. Add rate limiting and retry logic
5. Create methods for fetching top headlines
6. Add request/response logging
7. Environment variable configuration

**Files to Create**:
- `packages/backend/src/services/newsapi.ts`
- `packages/backend/src/services/base.ts` (shared HTTP client)
- `packages/backend/src/config/apis.ts`

**API Key**: `64bbfa65330e4d838bf9a197505b2e01`

**Acceptance Criteria**:
- Successfully fetch top 5 headlines
- Proper error handling for API failures
- Rate limiting respected
- Data properly mapped to TypeScript models

### Task 2.4: OpenWeatherMap Service Integration
**Objective**: Implement weather service for location-based data

**Implementation Steps**:
1. Create OpenWeatherMap API client
2. Implement geocoding for location lookup
3. Add current weather fetching
4. Handle API rate limits and errors
5. Cache weather data appropriately
6. Add support for multiple location formats

**Files to Create**:
- `packages/backend/src/services/weather.ts`
- `packages/backend/src/utils/geocoding.ts`

**API Key**: `b478e44facd0c82ef304e04c80ca9e0f`

**Acceptance Criteria**:
- Fetch weather by location name
- Handle geocoding failures gracefully
- Return standardized weather data
- Proper error handling and logging

### Task 2.5: Tiingo Stock Service Implementation
**Objective**: Implement stock data fetching for companies and S&P 500

**Implementation Steps**:
1. Create Tiingo API client
2. Implement company stock price lookup
3. Add S&P 500 index data fetching
4. Create company name to ticker mapping
5. Handle market hours and weekends
6. Add historical data capabilities

**Files to Create**:
- `packages/backend/src/services/tiingo.ts`
- `packages/backend/src/data/company-tickers.json`
- `packages/backend/src/utils/market.ts`

**API Key**: `27465c83310d7739ab0767eb939a179db9241985`

**Acceptance Criteria**:
- Fetch current stock prices
- S&P 500 data available
- Company name resolution working
- Handle market closures appropriately

### Task 2.6: Express REST API Endpoints
**Objective**: Build REST API with proper error handling

**Implementation Steps**:
1. Create route handlers in `packages/backend/src/routes/`
2. Implement `/api/news` endpoint
3. Implement `/api/weather` endpoint  
4. Implement `/api/stocks` endpoint
5. Add `/api/dashboard` combined endpoint
6. Implement proper HTTP status codes
7. Add request validation middleware
8. Create error handling middleware

**Files to Create**:
- `packages/backend/src/routes/news.ts`
- `packages/backend/src/routes/weather.ts`
- `packages/backend/src/routes/stocks.ts`
- `packages/backend/src/routes/dashboard.ts`
- `packages/backend/src/middleware/validation.ts`
- `packages/backend/src/middleware/errorHandler.ts`

**API Endpoints**:
- `GET /api/news` - Top headlines
- `GET /api/weather/:location` - Weather data
- `GET /api/stocks/:symbol` - Stock price
- `GET /api/dashboard` - Combined data

**Acceptance Criteria**:
- All endpoints functional
- Proper HTTP status codes
- Request/response validation
- Comprehensive error handling

### Task 2.7: CORS Middleware Setup
**Objective**: Configure CORS for React frontend communication

**Implementation Steps**:
1. Install cors middleware
2. Configure CORS for development
3. Set up production CORS settings
4. Test cross-origin requests
5. Add security headers

**Files to Modify**:
- `packages/backend/src/app.ts`
- `packages/backend/src/config/cors.ts`

**Acceptance Criteria**:
- Frontend can make API requests
- CORS properly configured for both dev/prod
- Security headers implemented
- Preflight requests handled

## Success Metrics
- All 7 Phase 2 tasks completed
- Backend API server running on specified port
- All external APIs integrated and functional
- Database operations working correctly
- Frontend can communicate with backend
- Comprehensive error handling implemented

## Dependencies & Prerequisites
- better-sqlite3, axios, cors packages installed
- API keys configured in environment variables
- Database directory structure created
- TypeScript compilation working

## Risk Mitigation
- API rate limits: Implement caching and request queuing
- External API failures: Add fallback data and proper error responses
- Database issues: Include migration rollback capabilities
- CORS problems: Test thoroughly with frontend development server

## Next Phase
Upon completion, Phase 3 will focus on data processing, NLP for entity extraction, and intelligent data linking between news, weather, and stock information.