import { z } from 'zod';

// Common API Response Schema
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  timestamp: z.string()
});

// Pagination Schema
export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1).max(100),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0)
});

export const PaginatedResponseSchema = ApiResponseSchema.extend({
  data: z.array(z.any()).optional(),
  pagination: PaginationSchema.optional()
});

// Dashboard Data Schema
export const DashboardDataSchema = z.object({
  news: z.array(z.any()),
  weather: z.any(),
  stocks: z.array(z.any()),
  lastUpdated: z.string()
});

// Service Error Schema
export const ServiceErrorSchema = z.object({
  source: z.enum(['newsapi', 'openweather', 'tiingo', 'database']),
  error: z.string(),
  statusCode: z.number().int().optional(),
  timestamp: z.string()
});

// Cache Info Schema
export const CacheInfoSchema = z.object({
  status: z.enum(['hit', 'miss', 'expired', 'disabled']),
  ttl: z.number().int().min(0).optional(),
  key: z.string().optional()
});

// Service Response Schema
export const ServiceResponseSchema = z.object({
  data: z.any(),
  source: z.enum(['newsapi', 'openweather', 'tiingo', 'database']),
  cache: CacheInfoSchema.optional(),
  error: ServiceErrorSchema.optional(),
  metadata: z.object({
    requestId: z.string(),
    processingTime: z.number().min(0),
    apiUsage: z.object({
      remaining: z.number().int().min(0),
      limit: z.number().int().min(0),
      resetTime: z.string().optional()
    }).optional()
  }).optional()
});

// Error Response Schema
export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number().int().min(100).max(599),
  timestamp: z.string(),
  path: z.string(),
  method: z.string()
});

// Environment Configuration Schemas
export const ApiConfigSchema = z.object({
  newsApiKey: z.string().min(1, 'News API key is required'),
  weatherApiKey: z.string().min(1, 'Weather API key is required'),
  stocksApiKey: z.string().min(1, 'Stocks API key is required'),
  baseUrls: z.object({
    newsApi: z.string().url('Invalid News API URL'),
    weatherApi: z.string().url('Invalid Weather API URL'),
    stocksApi: z.string().url('Invalid Stocks API URL')
  }),
  rateLimits: z.object({
    newsApi: z.number().int().min(1),
    weatherApi: z.number().int().min(1),
    stocksApi: z.number().int().min(1)
  })
});

export const ServerConfigSchema = z.object({
  port: z.number().int().min(1).max(65535),
  host: z.string().min(1),
  corsOrigins: z.array(z.string().url()),
  nodeEnv: z.enum(['development', 'production', 'test']),
  logLevel: z.enum(['debug', 'info', 'warn', 'error'])
});

// Database Options Schema
export const DatabaseOptionsSchema = z.object({
  readonly: z.boolean(),
  fileMustExist: z.boolean(),
  timeout: z.number().int().min(0),
  verbose: z.any().optional()
});

// Validation helper functions
export function validateApiResponse<T>(data: unknown): z.infer<typeof ApiResponseSchema> {
  return ApiResponseSchema.parse(data);
}

export function validatePaginatedResponse<T>(data: unknown): z.infer<typeof PaginatedResponseSchema> {
  return PaginatedResponseSchema.parse(data);
}

export function validateDashboardData(data: unknown): z.infer<typeof DashboardDataSchema> {
  return DashboardDataSchema.parse(data);
}

export function validateServiceResponse<T>(data: unknown): z.infer<typeof ServiceResponseSchema> {
  return ServiceResponseSchema.parse(data);
}

export function validateErrorResponse(data: unknown): z.infer<typeof ErrorResponseSchema> {
  return ErrorResponseSchema.parse(data);
}

// Type guards
export function isApiResponse(obj: any): obj is z.infer<typeof ApiResponseSchema> {
  return ApiResponseSchema.safeParse(obj).success;
}

export function isPaginatedResponse(obj: any): obj is z.infer<typeof PaginatedResponseSchema> {
  return PaginatedResponseSchema.safeParse(obj).success;
}

export function isServiceError(obj: any): obj is z.infer<typeof ServiceErrorSchema> {
  return ServiceErrorSchema.safeParse(obj).success;
}