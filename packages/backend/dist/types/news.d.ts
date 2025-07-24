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
export declare const NewsSourceSchema: z.ZodObject<{
    name: z.ZodString;
    id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const NewsArticleSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    urlToImage: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
    source: z.ZodObject<{
        name: z.ZodString;
        id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    author: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        general: "general";
        business: "business";
        entertainment: "entertainment";
        health: "health";
        science: "science";
        sports: "sports";
        technology: "technology";
    }>>>;
    createdAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
    updatedAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
}, z.core.$strip>;
export declare const NewsApiResponseSchema: z.ZodObject<{
    status: z.ZodString;
    totalResults: z.ZodNumber;
    articles: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        url: z.ZodString;
        urlToImage: z.ZodOptional<z.ZodString>;
        publishedAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
        source: z.ZodObject<{
            name: z.ZodString;
            id: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        author: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            general: "general";
            business: "business";
            entertainment: "entertainment";
            health: "health";
            science: "science";
            sports: "sports";
            technology: "technology";
        }>>>;
        createdAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
        updatedAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const NewsQuerySchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodEnum<{
        general: "general";
        business: "business";
        entertainment: "entertainment";
        health: "health";
        science: "science";
        sports: "sports";
        technology: "technology";
    }>>;
    country: z.ZodOptional<z.ZodString>;
    sources: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    pageSize: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    page: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type ValidatedNewsArticle = z.infer<typeof NewsArticleSchema>;
export type ValidatedNewsQuery = z.infer<typeof NewsQuerySchema>;
export type ValidatedNewsApiResponse = z.infer<typeof NewsApiResponseSchema>;
