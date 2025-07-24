"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseOptionsSchema = exports.ServerConfigSchema = exports.ApiConfigSchema = exports.ErrorResponseSchema = exports.ServiceResponseSchema = exports.CacheInfoSchema = exports.ServiceErrorSchema = exports.DashboardDataSchema = exports.PaginatedResponseSchema = exports.PaginationSchema = exports.ApiResponseSchema = void 0;
exports.validateApiResponse = validateApiResponse;
exports.validatePaginatedResponse = validatePaginatedResponse;
exports.validateDashboardData = validateDashboardData;
exports.validateServiceResponse = validateServiceResponse;
exports.validateErrorResponse = validateErrorResponse;
exports.isApiResponse = isApiResponse;
exports.isPaginatedResponse = isPaginatedResponse;
exports.isServiceError = isServiceError;
const zod_1 = require("zod");
// Common API Response Schema
exports.ApiResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    data: zod_1.z.any().optional(),
    error: zod_1.z.string().optional(),
    message: zod_1.z.string().optional(),
    timestamp: zod_1.z.string()
});
// Pagination Schema
exports.PaginationSchema = zod_1.z.object({
    page: zod_1.z.number().int().min(1),
    pageSize: zod_1.z.number().int().min(1).max(100),
    total: zod_1.z.number().int().min(0),
    totalPages: zod_1.z.number().int().min(0)
});
exports.PaginatedResponseSchema = exports.ApiResponseSchema.extend({
    data: zod_1.z.array(zod_1.z.any()).optional(),
    pagination: exports.PaginationSchema.optional()
});
// Dashboard Data Schema
exports.DashboardDataSchema = zod_1.z.object({
    news: zod_1.z.array(zod_1.z.any()),
    weather: zod_1.z.any(),
    stocks: zod_1.z.array(zod_1.z.any()),
    lastUpdated: zod_1.z.string()
});
// Service Error Schema
exports.ServiceErrorSchema = zod_1.z.object({
    source: zod_1.z.enum(['newsapi', 'openweather', 'tiingo', 'database']),
    error: zod_1.z.string(),
    statusCode: zod_1.z.number().int().optional(),
    timestamp: zod_1.z.string()
});
// Cache Info Schema
exports.CacheInfoSchema = zod_1.z.object({
    status: zod_1.z.enum(['hit', 'miss', 'expired', 'disabled']),
    ttl: zod_1.z.number().int().min(0).optional(),
    key: zod_1.z.string().optional()
});
// Service Response Schema
exports.ServiceResponseSchema = zod_1.z.object({
    data: zod_1.z.any(),
    source: zod_1.z.enum(['newsapi', 'openweather', 'tiingo', 'database']),
    cache: exports.CacheInfoSchema.optional(),
    error: exports.ServiceErrorSchema.optional(),
    metadata: zod_1.z.object({
        requestId: zod_1.z.string(),
        processingTime: zod_1.z.number().min(0),
        apiUsage: zod_1.z.object({
            remaining: zod_1.z.number().int().min(0),
            limit: zod_1.z.number().int().min(0),
            resetTime: zod_1.z.string().optional()
        }).optional()
    }).optional()
});
// Error Response Schema
exports.ErrorResponseSchema = zod_1.z.object({
    error: zod_1.z.string(),
    message: zod_1.z.string(),
    statusCode: zod_1.z.number().int().min(100).max(599),
    timestamp: zod_1.z.string(),
    path: zod_1.z.string(),
    method: zod_1.z.string()
});
// Environment Configuration Schemas
exports.ApiConfigSchema = zod_1.z.object({
    newsApiKey: zod_1.z.string().min(1, 'News API key is required'),
    weatherApiKey: zod_1.z.string().min(1, 'Weather API key is required'),
    stocksApiKey: zod_1.z.string().min(1, 'Stocks API key is required'),
    baseUrls: zod_1.z.object({
        newsApi: zod_1.z.string().url('Invalid News API URL'),
        weatherApi: zod_1.z.string().url('Invalid Weather API URL'),
        stocksApi: zod_1.z.string().url('Invalid Stocks API URL')
    }),
    rateLimits: zod_1.z.object({
        newsApi: zod_1.z.number().int().min(1),
        weatherApi: zod_1.z.number().int().min(1),
        stocksApi: zod_1.z.number().int().min(1)
    })
});
exports.ServerConfigSchema = zod_1.z.object({
    port: zod_1.z.number().int().min(1).max(65535),
    host: zod_1.z.string().min(1),
    corsOrigins: zod_1.z.array(zod_1.z.string().url()),
    nodeEnv: zod_1.z.enum(['development', 'production', 'test']),
    logLevel: zod_1.z.enum(['debug', 'info', 'warn', 'error'])
});
// Database Options Schema
exports.DatabaseOptionsSchema = zod_1.z.object({
    readonly: zod_1.z.boolean(),
    fileMustExist: zod_1.z.boolean(),
    timeout: zod_1.z.number().int().min(0),
    verbose: zod_1.z.any().optional()
});
// Validation helper functions
function validateApiResponse(data) {
    return exports.ApiResponseSchema.parse(data);
}
function validatePaginatedResponse(data) {
    return exports.PaginatedResponseSchema.parse(data);
}
function validateDashboardData(data) {
    return exports.DashboardDataSchema.parse(data);
}
function validateServiceResponse(data) {
    return exports.ServiceResponseSchema.parse(data);
}
function validateErrorResponse(data) {
    return exports.ErrorResponseSchema.parse(data);
}
// Type guards
function isApiResponse(obj) {
    return exports.ApiResponseSchema.safeParse(obj).success;
}
function isPaginatedResponse(obj) {
    return exports.PaginatedResponseSchema.safeParse(obj).success;
}
function isServiceError(obj) {
    return exports.ServiceErrorSchema.safeParse(obj).success;
}
