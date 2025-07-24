import { z } from 'zod';
export declare const ApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodString;
}, z.core.$strip>;
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
}, z.core.$strip>;
export declare const PaginatedResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodString;
    data: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    pagination: z.ZodOptional<z.ZodObject<{
        page: z.ZodNumber;
        pageSize: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const DashboardDataSchema: z.ZodObject<{
    news: z.ZodArray<z.ZodAny>;
    weather: z.ZodAny;
    stocks: z.ZodArray<z.ZodAny>;
    lastUpdated: z.ZodString;
}, z.core.$strip>;
export declare const ServiceErrorSchema: z.ZodObject<{
    source: z.ZodEnum<{
        newsapi: "newsapi";
        openweather: "openweather";
        tiingo: "tiingo";
        database: "database";
    }>;
    error: z.ZodString;
    statusCode: z.ZodOptional<z.ZodNumber>;
    timestamp: z.ZodString;
}, z.core.$strip>;
export declare const CacheInfoSchema: z.ZodObject<{
    status: z.ZodEnum<{
        hit: "hit";
        miss: "miss";
        expired: "expired";
        disabled: "disabled";
    }>;
    ttl: z.ZodOptional<z.ZodNumber>;
    key: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const ServiceResponseSchema: z.ZodObject<{
    data: z.ZodAny;
    source: z.ZodEnum<{
        newsapi: "newsapi";
        openweather: "openweather";
        tiingo: "tiingo";
        database: "database";
    }>;
    cache: z.ZodOptional<z.ZodObject<{
        status: z.ZodEnum<{
            hit: "hit";
            miss: "miss";
            expired: "expired";
            disabled: "disabled";
        }>;
        ttl: z.ZodOptional<z.ZodNumber>;
        key: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    error: z.ZodOptional<z.ZodObject<{
        source: z.ZodEnum<{
            newsapi: "newsapi";
            openweather: "openweather";
            tiingo: "tiingo";
            database: "database";
        }>;
        error: z.ZodString;
        statusCode: z.ZodOptional<z.ZodNumber>;
        timestamp: z.ZodString;
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodObject<{
        requestId: z.ZodString;
        processingTime: z.ZodNumber;
        apiUsage: z.ZodOptional<z.ZodObject<{
            remaining: z.ZodNumber;
            limit: z.ZodNumber;
            resetTime: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const ErrorResponseSchema: z.ZodObject<{
    error: z.ZodString;
    message: z.ZodString;
    statusCode: z.ZodNumber;
    timestamp: z.ZodString;
    path: z.ZodString;
    method: z.ZodString;
}, z.core.$strip>;
export declare const ApiConfigSchema: z.ZodObject<{
    newsApiKey: z.ZodString;
    weatherApiKey: z.ZodString;
    stocksApiKey: z.ZodString;
    baseUrls: z.ZodObject<{
        newsApi: z.ZodString;
        weatherApi: z.ZodString;
        stocksApi: z.ZodString;
    }, z.core.$strip>;
    rateLimits: z.ZodObject<{
        newsApi: z.ZodNumber;
        weatherApi: z.ZodNumber;
        stocksApi: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const ServerConfigSchema: z.ZodObject<{
    port: z.ZodNumber;
    host: z.ZodString;
    corsOrigins: z.ZodArray<z.ZodString>;
    nodeEnv: z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>;
    logLevel: z.ZodEnum<{
        error: "error";
        debug: "debug";
        info: "info";
        warn: "warn";
    }>;
}, z.core.$strip>;
export declare const DatabaseOptionsSchema: z.ZodObject<{
    readonly: z.ZodBoolean;
    fileMustExist: z.ZodBoolean;
    timeout: z.ZodNumber;
    verbose: z.ZodOptional<z.ZodAny>;
}, z.core.$strip>;
export declare function validateApiResponse<T>(data: unknown): z.infer<typeof ApiResponseSchema>;
export declare function validatePaginatedResponse<T>(data: unknown): z.infer<typeof PaginatedResponseSchema>;
export declare function validateDashboardData(data: unknown): z.infer<typeof DashboardDataSchema>;
export declare function validateServiceResponse<T>(data: unknown): z.infer<typeof ServiceResponseSchema>;
export declare function validateErrorResponse(data: unknown): z.infer<typeof ErrorResponseSchema>;
export declare function isApiResponse(obj: any): obj is z.infer<typeof ApiResponseSchema>;
export declare function isPaginatedResponse(obj: any): obj is z.infer<typeof PaginatedResponseSchema>;
export declare function isServiceError(obj: any): obj is z.infer<typeof ServiceErrorSchema>;
