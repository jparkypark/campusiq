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
export declare const WeatherConditionSchema: z.ZodObject<{
    main: z.ZodString;
    description: z.ZodString;
    icon: z.ZodString;
}, z.core.$strip>;
export declare const WeatherCoordinatesSchema: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, z.core.$strip>;
export declare const WeatherWindSchema: z.ZodObject<{
    speed: z.ZodNumber;
    direction: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const WeatherDataSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    location: z.ZodString;
    country: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    temperature: z.ZodNumber;
    feelsLike: z.ZodOptional<z.ZodNumber>;
    humidity: z.ZodOptional<z.ZodNumber>;
    pressure: z.ZodOptional<z.ZodNumber>;
    visibility: z.ZodOptional<z.ZodNumber>;
    windSpeed: z.ZodOptional<z.ZodNumber>;
    windDirection: z.ZodOptional<z.ZodNumber>;
    weatherMain: z.ZodString;
    weatherDescription: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    recordedAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
    createdAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
    updatedAt: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>;
}, z.core.$strip>;
export declare const WeatherApiResponseSchema: z.ZodObject<{
    coord: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    weather: z.ZodArray<z.ZodObject<{
        main: z.ZodString;
        description: z.ZodString;
        icon: z.ZodString;
    }, z.core.$strip>>;
    main: z.ZodObject<{
        temp: z.ZodNumber;
        feels_like: z.ZodNumber;
        temp_min: z.ZodNumber;
        temp_max: z.ZodNumber;
        pressure: z.ZodNumber;
        humidity: z.ZodNumber;
    }, z.core.$strip>;
    visibility: z.ZodNumber;
    wind: z.ZodObject<{
        speed: z.ZodNumber;
        direction: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    sys: z.ZodObject<{
        country: z.ZodString;
        sunrise: z.ZodNumber;
        sunset: z.ZodNumber;
    }, z.core.$strip>;
    name: z.ZodString;
    dt: z.ZodNumber;
}, z.core.$strip>;
export declare const GeocodingResultSchema: z.ZodObject<{
    name: z.ZodString;
    lat: z.ZodNumber;
    lon: z.ZodNumber;
    country: z.ZodString;
    state: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const WeatherQuerySchema: z.ZodObject<{
    location: z.ZodOptional<z.ZodString>;
    lat: z.ZodOptional<z.ZodNumber>;
    lon: z.ZodOptional<z.ZodNumber>;
    units: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        metric: "metric";
        imperial: "imperial";
        kelvin: "kelvin";
    }>>>;
}, z.core.$strip>;
export type ValidatedWeatherData = z.infer<typeof WeatherDataSchema>;
export type ValidatedWeatherQuery = z.infer<typeof WeatherQuerySchema>;
export type ValidatedWeatherApiResponse = z.infer<typeof WeatherApiResponseSchema>;
export type ValidatedGeocodingResult = z.infer<typeof GeocodingResultSchema>;
