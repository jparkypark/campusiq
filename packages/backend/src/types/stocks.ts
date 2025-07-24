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

export const StockDataSchema = z.object({
  id: z.number().int().positive().optional(),
  symbol: z.string().min(1, 'Stock symbol is required').max(10, 'Symbol too long').toUpperCase(),
  companyName: z.string().min(1, 'Company name is required').max(200, 'Company name too long'),
  currentPrice: z.number().positive('Stock price must be positive'),
  priceChange: z.number().optional(),
  priceChangePercent: z.number().optional(),
  previousClose: z.number().positive('Previous close must be positive').optional(),
  marketCap: z.number().positive('Market cap must be positive').optional(),
  volume: z.number().int().min(0, 'Volume cannot be negative').optional(),
  high52Week: z.number().positive('52-week high must be positive').optional(),
  low52Week: z.number().positive('52-week low must be positive').optional(),
  marketStatus: z.enum(['open', 'closed', 'pre-market', 'after-hours']).default('closed').optional(),
  recordedAt: z.union([z.string(), z.date()]),
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional()
});

export const TiingoStockResponseSchema = z.object({
  ticker: z.string().min(1, 'Ticker is required'),
  name: z.string().min(1, 'Company name is required'),
  exchangeCode: z.string().min(1, 'Exchange code is required'),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string()
});

export const TiingoStockPriceSchema = z.object({
  ticker: z.string().min(1, 'Ticker is required'),
  timestamp: z.string(),
  close: z.number(),
  high: z.number(),
  low: z.number(),
  open: z.number(),
  volume: z.number().int().min(0),
  adjClose: z.number(),
  adjHigh: z.number(),
  adjLow: z.number(),
  adjOpen: z.number(),
  adjVolume: z.number().int().min(0),
  divCash: z.number(),
  splitFactor: z.number()
});

export const TiingoEODPriceSchema = z.object({
  date: z.string(),
  close: z.number(),
  high: z.number(),
  low: z.number(),
  open: z.number(),
  volume: z.number().int().min(0),
  adjClose: z.number(),
  adjHigh: z.number(),
  adjLow: z.number(),
  adjOpen: z.number(),
  adjVolume: z.number().int().min(0),
  divCash: z.number(),
  splitFactor: z.number()
});

export const CompanyTickerSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required').max(10, 'Symbol too long').toUpperCase(),
  name: z.string().min(1, 'Company name is required').max(200, 'Company name too long'),
  exchange: z.string().max(50, 'Exchange name too long').optional(),
  sector: z.string().max(100, 'Sector name too long').optional(),
  industry: z.string().max(100, 'Industry name too long').optional()
});

export const StockQuerySchema = z.object({
  symbol: z.string().min(1, 'Symbol is required when specified').max(10, 'Symbol too long').toUpperCase().optional(),
  symbols: z.array(z.string().min(1).max(10).toUpperCase()).max(10, 'Too many symbols').optional(),
  companyName: z.string().min(1, 'Company name is required when specified').max(200, 'Company name too long').optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
  resampleFreq: z.enum(['daily', 'weekly', 'monthly']).default('daily').optional()
});

export const MarketStatusSchema = z.object({
  isOpen: z.boolean(),
  nextOpen: z.date().optional(),
  nextClose: z.date().optional(),
  timezone: z.string().min(1, 'Timezone is required'),
  currentTime: z.date()
});

export type ValidatedStockData = z.infer<typeof StockDataSchema>;
export type ValidatedStockQuery = z.infer<typeof StockQuerySchema>;
export type ValidatedTiingoStockResponse = z.infer<typeof TiingoStockResponseSchema>;
export type ValidatedTiingoStockPrice = z.infer<typeof TiingoStockPriceSchema>;
export type ValidatedTiingoEODPrice = z.infer<typeof TiingoEODPriceSchema>;
export type ValidatedCompanyTicker = z.infer<typeof CompanyTickerSchema>;
export type ValidatedMarketStatus = z.infer<typeof MarketStatusSchema>;