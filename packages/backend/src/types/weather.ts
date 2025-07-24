import { z } from 'zod';

export interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

export interface WeatherCoordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherWind {
  speed: number;
  direction?: number;
}

export interface WeatherData {
  id?: number;
  location: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  temperature: number;
  feelsLike?: number;
  humidity?: number;
  pressure?: number;
  visibility?: number;
  windSpeed?: number;
  windDirection?: number;
  weatherMain: string;
  weatherDescription: string;
  icon?: string;
  recordedAt: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface WeatherApiResponse {
  coord: WeatherCoordinates;
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: WeatherWind;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
}

export interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherQuery {
  location?: string;
  lat?: number;
  lon?: number;
  units?: 'metric' | 'imperial' | 'kelvin';
}

export const WeatherConditionSchema = z.object({
  main: z.string().min(1, 'Weather main condition is required'),
  description: z.string().min(1, 'Weather description is required'),
  icon: z.string().min(1, 'Weather icon is required')
});

export const WeatherCoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90, 'Invalid latitude'),
  longitude: z.number().min(-180).max(180, 'Invalid longitude')
});

export const WeatherWindSchema = z.object({
  speed: z.number().min(0, 'Wind speed cannot be negative'),
  direction: z.number().min(0).max(360, 'Wind direction must be 0-360 degrees').optional()
});

export const WeatherDataSchema = z.object({
  id: z.number().int().positive().optional(),
  location: z.string().min(1, 'Location is required').max(200, 'Location name too long'),
  country: z.string().max(100, 'Country name too long').optional(),
  latitude: z.number().min(-90).max(90, 'Invalid latitude').optional(),
  longitude: z.number().min(-180).max(180, 'Invalid longitude').optional(),
  temperature: z.number(),
  feelsLike: z.number().optional(),
  humidity: z.number().int().min(0).max(100, 'Humidity must be 0-100%').optional(),
  pressure: z.number().min(0, 'Pressure cannot be negative').optional(),
  visibility: z.number().min(0, 'Visibility cannot be negative').optional(),
  windSpeed: z.number().min(0, 'Wind speed cannot be negative').optional(),
  windDirection: z.number().min(0).max(360, 'Wind direction must be 0-360 degrees').optional(),
  weatherMain: z.string().min(1, 'Weather main condition is required'),
  weatherDescription: z.string().min(1, 'Weather description is required'),
  icon: z.string().optional(),
  recordedAt: z.union([z.string(), z.date()]),
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional()
});

export const WeatherApiResponseSchema = z.object({
  coord: WeatherCoordinatesSchema,
  weather: z.array(WeatherConditionSchema).min(1, 'At least one weather condition required'),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number().min(0),
    humidity: z.number().int().min(0).max(100)
  }),
  visibility: z.number().min(0),
  wind: WeatherWindSchema,
  sys: z.object({
    country: z.string().length(2, 'Country code must be 2 characters'),
    sunrise: z.number().int(),
    sunset: z.number().int()
  }),
  name: z.string().min(1, 'Location name is required'),
  dt: z.number().int()
});

export const GeocodingResultSchema = z.object({
  name: z.string().min(1, 'Location name is required'),
  lat: z.number().min(-90).max(90, 'Invalid latitude'),
  lon: z.number().min(-180).max(180, 'Invalid longitude'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().optional()
});

export const WeatherQuerySchema = z.object({
  location: z.string().min(1, 'Location is required').max(200, 'Location name too long').optional(),
  lat: z.number().min(-90).max(90, 'Invalid latitude').optional(),
  lon: z.number().min(-180).max(180, 'Invalid longitude').optional(),
  units: z.enum(['metric', 'imperial', 'kelvin']).default('metric').optional()
}).refine(
  (data) => data.location || (data.lat !== undefined && data.lon !== undefined),
  {
    message: 'Either location name or coordinates (lat, lon) must be provided',
    path: ['location']
  }
);

export type ValidatedWeatherData = z.infer<typeof WeatherDataSchema>;
export type ValidatedWeatherQuery = z.infer<typeof WeatherQuerySchema>;
export type ValidatedWeatherApiResponse = z.infer<typeof WeatherApiResponseSchema>;
export type ValidatedGeocodingResult = z.infer<typeof GeocodingResultSchema>;