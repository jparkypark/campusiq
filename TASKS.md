# CampusIQ Monorepo - News, Weather & Stock Integration

## Project Overview
Build a monorepo application that integrates data from NewsAPI, OpenWeatherMap, and Tiingo APIs to display news stories with related weather and stock information.

**Tech Stack**:
- **Backend**: Node.js + TypeScript + Express.js + SQLite (better-sqlite3)
- **Frontend**: React + TypeScript + Vite + React Query + Tailwind CSS
- **Structure**: Monorepo with `packages/backend` and `packages/frontend`
- **State Management**: React Query for server state, built-in React state for UI state
- **APIs**: NewsAPI, OpenWeatherMap, Tiingo (keys provided)

---

## Phase 1: Monorepo Setup & Structure

- [ ] **Task 1.1**: Initialize monorepo with workspace structure (`packages/backend`, `packages/frontend`)
- [ ] **Task 1.2**: Set up Node.js/TypeScript backend with Express.js
- [ ] **Task 1.3**: Set up React frontend with TypeScript and Vite
- [ ] **Task 1.4**: Configure shared package.json with workspaces and common dependencies
- [ ] **Task 1.5**: Set up development scripts for concurrent backend/frontend development
- [ ] **Task 1.6**: Configure TypeScript configs for both packages

## Phase 2: Backend API Development

- [ ] **Task 2.1**: Set up SQLite database with better-sqlite3 and schema creation
- [ ] **Task 2.2**: Create TypeScript models/interfaces for News, Weather, Stocks
- [ ] **Task 2.3**: Implement NewsAPI service with axios/fetch
- [ ] **Task 2.4**: Implement OpenWeatherMap service integration
- [ ] **Task 2.5**: Implement Tiingo service for stock data (companies + S&P 500)
- [ ] **Task 2.6**: Build Express REST API endpoints with proper error handling
- [ ] **Task 2.7**: Add CORS middleware for React frontend communication

## Phase 3: Data Processing & Intelligence

- [ ] **Task 3.1**: Create NLP utilities to extract locations from news headlines (using natural/compromise)
- [ ] **Task 3.2**: Implement company name extraction from news content
- [ ] **Task 3.3**: Build data pipeline: fetch news → extract entities → fetch weather/stocks
- [ ] **Task 3.4**: Create database relationships and intelligent data linking
- [ ] **Task 3.5**: Add API endpoints with filtering (date range, location, company)
- [ ] **Task 3.6**: Implement caching layer for API responses

## Phase 4: React Frontend Development

- [ ] **Task 4.1**: Set up React with TypeScript, React Router, and React Query
- [ ] **Task 4.2**: Create reusable components (NewsCard, WeatherDisplay, StockTicker)
- [ ] **Task 4.3**: Build main dashboard showing integrated news/weather/stock data
- [ ] **Task 4.4**: Implement date range picker for filtering past week data using built-in React state
- [ ] **Task 4.5**: Add loading states, error boundaries, and responsive design
- [ ] **Task 4.6**: Create React Query hooks for API data fetching and caching
- [ ] **Task 4.7**: Add modern UI styling (Tailwind CSS or styled-components)

## Phase 5: Integration & Testing

- [ ] **Task 5.1**: Connect React frontend to Node.js backend via React Query
- [ ] **Task 5.2**: Test all external API integrations with provided keys
- [ ] **Task 5.3**: End-to-end testing of data flow and UI functionality
- [ ] **Task 5.4**: Add comprehensive error handling and user feedback
- [ ] **Task 5.5**: Performance optimization with React Query caching and request batching

---

## API Keys (from REQUIREMENTS.md)

- **NewsAPI**: `64bbfa65330e4d838bf9a197505b2e01`
- **OpenWeatherMap**: `b478e44facd0c82ef304e04c80ca9e0f`
- **Tiingo**: `27465c83310d7739ab0767eb939a179db9241985`

## Database Schema

- **News**: `id`, `headline`, `location`, `date`
- **Weather**: `id`, `location`, `temperature`, `date`
- **Stocks**: `id`, `company`, `price`, `date`

## Key Features

- Display top 5 news headlines
- Show weather data for first location mentioned in news
- Display stock prices for companies mentioned in news (or S&P 500)
- Filter data by selecting dates within the past week
- Intelligent data relationships between news, weather, and stocks