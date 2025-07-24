// News types and schemas
export * from './news';

// Weather types and schemas  
export * from './weather';

// Stocks types and schemas
export * from './stocks';

// Common types and schemas
export * from './common';

// Shared utility types and enums
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardData {
  news: any[];
  weather: any;
  stocks: any[];
  lastUpdated: string;
}

export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  PARTIAL = 'partial'
}

export enum DataSource {
  NEWS_API = 'newsapi',
  OPENWEATHER = 'openweather',
  TIINGO = 'tiingo',
  DATABASE = 'database'
}

export enum CacheStatus {
  HIT = 'hit',
  MISS = 'miss',
  EXPIRED = 'expired',
  DISABLED = 'disabled'
}

export interface ServiceError {
  source: DataSource;
  error: string;
  statusCode?: number;
  timestamp: string;
}

export interface CacheInfo {
  status: CacheStatus;
  ttl?: number;
  key?: string;
}

export interface ServiceResponse<T> {
  data: T;
  source: DataSource;
  cache?: CacheInfo;
  error?: ServiceError;
  metadata?: {
    requestId: string;
    processingTime: number;
    apiUsage?: {
      remaining: number;
      limit: number;
      resetTime?: string;
    };
  };
}

// Database connection types
export interface DatabaseOptions {
  readonly: boolean;
  fileMustExist: boolean;
  timeout: number;
  verbose?: (message?: any, ...additionalArgs: any[]) => void;
}

// Environment configuration types
export interface ApiConfig {
  newsApiKey: string;
  weatherApiKey: string;
  stocksApiKey: string;
  baseUrls: {
    newsApi: string;
    weatherApi: string;
    stocksApi: string;
  };
  rateLimits: {
    newsApi: number;
    weatherApi: number;
    stocksApi: number;
  };
}

export interface ServerConfig {
  port: number;
  host: string;
  corsOrigins: string[];
  nodeEnv: 'development' | 'production' | 'test';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

// Request/Response middleware types
export interface ValidatedRequest<T = any> extends Express.Request {
  validated: T;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
}

// Utility types for API endpoints
export type NewsEndpointResponse = ApiResponse<any[]>;
export type WeatherEndpointResponse = ApiResponse<any>;
export type StocksEndpointResponse = ApiResponse<any[]>;
export type DashboardEndpointResponse = ApiResponse<DashboardData>;