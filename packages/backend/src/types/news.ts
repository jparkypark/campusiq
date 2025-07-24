import { z } from 'zod';

export interface NewsSource {
  name: string;
  id?: string;
}

export interface NewsArticle {
  id?: number;
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string | Date;
  source: NewsSource;
  author?: string;
  category?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsQuery {
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
  country?: string;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}

export const NewsSourceSchema = z.object({
  name: z.string().min(1, 'Source name is required'),
  id: z.string().optional()
});

export const NewsArticleSchema = z.object({
  id: z.number().int().positive().optional(),
  title: z.string().min(1, 'Title is required').max(500, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  content: z.string().optional(),
  url: z.string().url('Invalid URL format'),
  urlToImage: z.string().url('Invalid image URL format').optional(),
  publishedAt: z.union([z.string(), z.date()]),
  source: NewsSourceSchema,
  author: z.string().max(200, 'Author name too long').optional(),
  category: z.enum([
    'business', 'entertainment', 'general', 'health', 
    'science', 'sports', 'technology'
  ]).default('general').optional(),
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional()
});

export const NewsApiResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number().int().min(0),
  articles: z.array(NewsArticleSchema)
});

export const NewsQuerySchema = z.object({
  category: z.enum([
    'business', 'entertainment', 'general', 'health', 
    'science', 'sports', 'technology'
  ]).optional(),
  country: z.string().length(2, 'Country code must be 2 characters').optional(),
  sources: z.string().optional(),
  q: z.string().max(500, 'Query too long').optional(),
  pageSize: z.number().int().min(1).max(100).default(20).optional(),
  page: z.number().int().min(1).optional()
});

export type ValidatedNewsArticle = z.infer<typeof NewsArticleSchema>;
export type ValidatedNewsQuery = z.infer<typeof NewsQuerySchema>;
export type ValidatedNewsApiResponse = z.infer<typeof NewsApiResponseSchema>;