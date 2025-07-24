"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsQuerySchema = exports.NewsApiResponseSchema = exports.NewsArticleSchema = exports.NewsSourceSchema = void 0;
const zod_1 = require("zod");
exports.NewsSourceSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Source name is required'),
    id: zod_1.z.string().optional()
});
exports.NewsArticleSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    title: zod_1.z.string().min(1, 'Title is required').max(500, 'Title too long'),
    description: zod_1.z.string().max(1000, 'Description too long').optional(),
    content: zod_1.z.string().optional(),
    url: zod_1.z.string().url('Invalid URL format'),
    urlToImage: zod_1.z.string().url('Invalid image URL format').optional(),
    publishedAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]),
    source: exports.NewsSourceSchema,
    author: zod_1.z.string().max(200, 'Author name too long').optional(),
    category: zod_1.z.enum([
        'business', 'entertainment', 'general', 'health',
        'science', 'sports', 'technology'
    ]).default('general').optional(),
    createdAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).optional(),
    updatedAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).optional()
});
exports.NewsApiResponseSchema = zod_1.z.object({
    status: zod_1.z.string(),
    totalResults: zod_1.z.number().int().min(0),
    articles: zod_1.z.array(exports.NewsArticleSchema)
});
exports.NewsQuerySchema = zod_1.z.object({
    category: zod_1.z.enum([
        'business', 'entertainment', 'general', 'health',
        'science', 'sports', 'technology'
    ]).optional(),
    country: zod_1.z.string().length(2, 'Country code must be 2 characters').optional(),
    sources: zod_1.z.string().optional(),
    q: zod_1.z.string().max(500, 'Query too long').optional(),
    pageSize: zod_1.z.number().int().min(1).max(100).default(20).optional(),
    page: zod_1.z.number().int().min(1).optional()
});
