import { z } from 'zod';
export interface StockData {
    id?: number;
    symbol: string;
    companyName: string;
    currentPrice: number;
    priceChange?: number;
    priceChangePercent?: number;
    previousClose?: number;
    marketCap?: number;
    volume?: number;
    high52Week?: number;
    low52Week?: number;
    marketStatus?: 'open' | 'closed' | 'pre-market' | 'after-hours';
    recordedAt: string | Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
export interface TiingoStockResponse {
    ticker: string;
    name: string;
    exchangeCode: string;
    startDate: string;
    endDate: string;
    description: string;
}
export interface TiingoStockPrice {
    ticker: string;
    timestamp: string;
    close: number;
    high: number;
    low: number;
    open: number;
    volume: number;
    adjClose: number;
    adjHigh: number;
    adjLow: number;
    adjOpen: number;
    adjVolume: number;
    divCash: number;
    splitFactor: number;
}
export interface TiingoEODPrice {
    date: string;
    close: number;
    high: number;
    low: number;
    open: number;
    volume: number;
    adjClose: number;
    adjHigh: number;
    adjLow: number;
    adjOpen: number;
    adjVolume: number;
    divCash: number;
    splitFactor: number;
}
export interface CompanyTicker {
    symbol: string;
    name: string;
    exchange?: string;
    sector?: string;
    industry?: string;
}
export interface StockQuery {
    symbol?: string;
    symbols?: string[];
    companyName?: string;
    startDate?: string;
    endDate?: string;
    resampleFreq?: 'daily' | 'weekly' | 'monthly';
}
export interface MarketStatus {
    isOpen: boolean;
    nextOpen?: Date;
    nextClose?: Date;
    timezone: string;
    currentTime: Date;
}
export declare const StockDataSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    symbol: z.ZodString;
    companyName: z.ZodString;
    currentPrice: z.ZodNumber;
    priceChange: z.ZodOptional<z.ZodNumber>;
    priceChangePercent: z.ZodOptional<z.ZodNumber>;
    previousClose: z.ZodOptional<z.ZodNumber>;
    marketCap: z.ZodOptional<z.ZodNumber>;
    volume: z.ZodOptional<z.ZodNumber>;
    high52Week: z.ZodOptional<z.ZodNumber>;
    low52Week: z.ZodOptional<z.ZodNumber>;
    marketStatus: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        closed: "closed";
        open: "open";
        "pre-market": "pre-market";
        "after-hours": "after-hours";
    }>>>;
    recordedAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
    createdAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
    updatedAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
}, z.core.$strip>;
export declare const TiingoStockResponseSchema: z.ZodObject<{
    ticker: z.ZodString;
    name: z.ZodString;
    exchangeCode: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export declare const TiingoStockPriceSchema: z.ZodObject<{
    ticker: z.ZodString;
    timestamp: z.ZodString;
    close: z.ZodNumber;
    high: z.ZodNumber;
    low: z.ZodNumber;
    open: z.ZodNumber;
    volume: z.ZodNumber;
    adjClose: z.ZodNumber;
    adjHigh: z.ZodNumber;
    adjLow: z.ZodNumber;
    adjOpen: z.ZodNumber;
    adjVolume: z.ZodNumber;
    divCash: z.ZodNumber;
    splitFactor: z.ZodNumber;
}, z.core.$strip>;
export declare const TiingoEODPriceSchema: z.ZodObject<{
    date: z.ZodString;
    close: z.ZodNumber;
    high: z.ZodNumber;
    low: z.ZodNumber;
    open: z.ZodNumber;
    volume: z.ZodNumber;
    adjClose: z.ZodNumber;
    adjHigh: z.ZodNumber;
    adjLow: z.ZodNumber;
    adjOpen: z.ZodNumber;
    adjVolume: z.ZodNumber;
    divCash: z.ZodNumber;
    splitFactor: z.ZodNumber;
}, z.core.$strip>;
export declare const CompanyTickerSchema: z.ZodObject<{
    symbol: z.ZodString;
    name: z.ZodString;
    exchange: z.ZodOptional<z.ZodString>;
    sector: z.ZodOptional<z.ZodString>;
    industry: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const StockQuerySchema: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodString>;
    symbols: z.ZodOptional<z.ZodArray<z.ZodString>>;
    companyName: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    resampleFreq: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        daily: "daily";
        weekly: "weekly";
        monthly: "monthly";
    }>>>;
}, z.core.$strip>;
export declare const MarketStatusSchema: z.ZodObject<{
    isOpen: z.ZodBoolean;
    nextOpen: z.ZodOptional<z.ZodDate>;
    nextClose: z.ZodOptional<z.ZodDate>;
    timezone: z.ZodString;
    currentTime: z.ZodDate;
}, z.core.$strip>;
export type ValidatedStockData = z.infer<typeof StockDataSchema>;
export type ValidatedStockQuery = z.infer<typeof StockQuerySchema>;
export type ValidatedTiingoStockResponse = z.infer<typeof TiingoStockResponseSchema>;
export type ValidatedTiingoStockPrice = z.infer<typeof TiingoStockPriceSchema>;
export type ValidatedTiingoEODPrice = z.infer<typeof TiingoEODPriceSchema>;
export type ValidatedCompanyTicker = z.infer<typeof CompanyTickerSchema>;
export type ValidatedMarketStatus = z.infer<typeof MarketStatusSchema>;
