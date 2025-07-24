"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketStatusSchema = exports.StockQuerySchema = exports.CompanyTickerSchema = exports.TiingoEODPriceSchema = exports.TiingoStockPriceSchema = exports.TiingoStockResponseSchema = exports.StockDataSchema = void 0;
const zod_1 = require("zod");
exports.StockDataSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    symbol: zod_1.z.string().min(1, 'Stock symbol is required').max(10, 'Symbol too long').toUpperCase(),
    companyName: zod_1.z.string().min(1, 'Company name is required').max(200, 'Company name too long'),
    currentPrice: zod_1.z.number().positive('Stock price must be positive'),
    priceChange: zod_1.z.number().optional(),
    priceChangePercent: zod_1.z.number().optional(),
    previousClose: zod_1.z.number().positive('Previous close must be positive').optional(),
    marketCap: zod_1.z.number().positive('Market cap must be positive').optional(),
    volume: zod_1.z.number().int().min(0, 'Volume cannot be negative').optional(),
    high52Week: zod_1.z.number().positive('52-week high must be positive').optional(),
    low52Week: zod_1.z.number().positive('52-week low must be positive').optional(),
    marketStatus: zod_1.z.enum(['open', 'closed', 'pre-market', 'after-hours']).default('closed').optional(),
    recordedAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]),
    createdAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).optional(),
    updatedAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).optional()
});
exports.TiingoStockResponseSchema = zod_1.z.object({
    ticker: zod_1.z.string().min(1, 'Ticker is required'),
    name: zod_1.z.string().min(1, 'Company name is required'),
    exchangeCode: zod_1.z.string().min(1, 'Exchange code is required'),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    description: zod_1.z.string()
});
exports.TiingoStockPriceSchema = zod_1.z.object({
    ticker: zod_1.z.string().min(1, 'Ticker is required'),
    timestamp: zod_1.z.string(),
    close: zod_1.z.number(),
    high: zod_1.z.number(),
    low: zod_1.z.number(),
    open: zod_1.z.number(),
    volume: zod_1.z.number().int().min(0),
    adjClose: zod_1.z.number(),
    adjHigh: zod_1.z.number(),
    adjLow: zod_1.z.number(),
    adjOpen: zod_1.z.number(),
    adjVolume: zod_1.z.number().int().min(0),
    divCash: zod_1.z.number(),
    splitFactor: zod_1.z.number()
});
exports.TiingoEODPriceSchema = zod_1.z.object({
    date: zod_1.z.string(),
    close: zod_1.z.number(),
    high: zod_1.z.number(),
    low: zod_1.z.number(),
    open: zod_1.z.number(),
    volume: zod_1.z.number().int().min(0),
    adjClose: zod_1.z.number(),
    adjHigh: zod_1.z.number(),
    adjLow: zod_1.z.number(),
    adjOpen: zod_1.z.number(),
    adjVolume: zod_1.z.number().int().min(0),
    divCash: zod_1.z.number(),
    splitFactor: zod_1.z.number()
});
exports.CompanyTickerSchema = zod_1.z.object({
    symbol: zod_1.z.string().min(1, 'Symbol is required').max(10, 'Symbol too long').toUpperCase(),
    name: zod_1.z.string().min(1, 'Company name is required').max(200, 'Company name too long'),
    exchange: zod_1.z.string().max(50, 'Exchange name too long').optional(),
    sector: zod_1.z.string().max(100, 'Sector name too long').optional(),
    industry: zod_1.z.string().max(100, 'Industry name too long').optional()
});
exports.StockQuerySchema = zod_1.z.object({
    symbol: zod_1.z.string().min(1, 'Symbol is required when specified').max(10, 'Symbol too long').toUpperCase().optional(),
    symbols: zod_1.z.array(zod_1.z.string().min(1).max(10).toUpperCase()).max(10, 'Too many symbols').optional(),
    companyName: zod_1.z.string().min(1, 'Company name is required when specified').max(200, 'Company name too long').optional(),
    startDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
    endDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
    resampleFreq: zod_1.z.enum(['daily', 'weekly', 'monthly']).default('daily').optional()
});
exports.MarketStatusSchema = zod_1.z.object({
    isOpen: zod_1.z.boolean(),
    nextOpen: zod_1.z.date().optional(),
    nextClose: zod_1.z.date().optional(),
    timezone: zod_1.z.string().min(1, 'Timezone is required'),
    currentTime: zod_1.z.date()
});
