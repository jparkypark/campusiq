"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherQuerySchema = exports.GeocodingResultSchema = exports.WeatherApiResponseSchema = exports.WeatherDataSchema = exports.WeatherWindSchema = exports.WeatherCoordinatesSchema = exports.WeatherConditionSchema = void 0;
const zod_1 = require("zod");
exports.WeatherConditionSchema = zod_1.z.object({
    main: zod_1.z.string().min(1, 'Weather main condition is required'),
    description: zod_1.z.string().min(1, 'Weather description is required'),
    icon: zod_1.z.string().min(1, 'Weather icon is required')
});
exports.WeatherCoordinatesSchema = zod_1.z.object({
    latitude: zod_1.z.number().min(-90).max(90, 'Invalid latitude'),
    longitude: zod_1.z.number().min(-180).max(180, 'Invalid longitude')
});
exports.WeatherWindSchema = zod_1.z.object({
    speed: zod_1.z.number().min(0, 'Wind speed cannot be negative'),
    direction: zod_1.z.number().min(0).max(360, 'Wind direction must be 0-360 degrees').optional()
});
exports.WeatherDataSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive().optional(),
    location: zod_1.z.string().min(1, 'Location is required').max(200, 'Location name too long'),
    country: zod_1.z.string().max(100, 'Country name too long').optional(),
    latitude: zod_1.z.number().min(-90).max(90, 'Invalid latitude').optional(),
    longitude: zod_1.z.number().min(-180).max(180, 'Invalid longitude').optional(),
    temperature: zod_1.z.number(),
    feelsLike: zod_1.z.number().optional(),
    humidity: zod_1.z.number().int().min(0).max(100, 'Humidity must be 0-100%').optional(),
    pressure: zod_1.z.number().min(0, 'Pressure cannot be negative').optional(),
    visibility: zod_1.z.number().min(0, 'Visibility cannot be negative').optional(),
    windSpeed: zod_1.z.number().min(0, 'Wind speed cannot be negative').optional(),
    windDirection: zod_1.z.number().min(0).max(360, 'Wind direction must be 0-360 degrees').optional(),
    weatherMain: zod_1.z.string().min(1, 'Weather main condition is required'),
    weatherDescription: zod_1.z.string().min(1, 'Weather description is required'),
    icon: zod_1.z.string().optional(),
    recordedAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]),
    createdAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).optional(),
    updatedAt: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).optional()
});
exports.WeatherApiResponseSchema = zod_1.z.object({
    coord: exports.WeatherCoordinatesSchema,
    weather: zod_1.z.array(exports.WeatherConditionSchema).min(1, 'At least one weather condition required'),
    main: zod_1.z.object({
        temp: zod_1.z.number(),
        feels_like: zod_1.z.number(),
        temp_min: zod_1.z.number(),
        temp_max: zod_1.z.number(),
        pressure: zod_1.z.number().min(0),
        humidity: zod_1.z.number().int().min(0).max(100)
    }),
    visibility: zod_1.z.number().min(0),
    wind: exports.WeatherWindSchema,
    sys: zod_1.z.object({
        country: zod_1.z.string().length(2, 'Country code must be 2 characters'),
        sunrise: zod_1.z.number().int(),
        sunset: zod_1.z.number().int()
    }),
    name: zod_1.z.string().min(1, 'Location name is required'),
    dt: zod_1.z.number().int()
});
exports.GeocodingResultSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Location name is required'),
    lat: zod_1.z.number().min(-90).max(90, 'Invalid latitude'),
    lon: zod_1.z.number().min(-180).max(180, 'Invalid longitude'),
    country: zod_1.z.string().min(1, 'Country is required'),
    state: zod_1.z.string().optional()
});
exports.WeatherQuerySchema = zod_1.z.object({
    location: zod_1.z.string().min(1, 'Location is required').max(200, 'Location name too long').optional(),
    lat: zod_1.z.number().min(-90).max(90, 'Invalid latitude').optional(),
    lon: zod_1.z.number().min(-180).max(180, 'Invalid longitude').optional(),
    units: zod_1.z.enum(['metric', 'imperial', 'kelvin']).default('metric').optional()
}).refine((data) => data.location || (data.lat !== undefined && data.lon !== undefined), {
    message: 'Either location name or coordinates (lat, lon) must be provided',
    path: ['location']
});
