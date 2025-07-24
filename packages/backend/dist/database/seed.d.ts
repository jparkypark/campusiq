interface SeedData {
    news?: any[];
    weather?: any[];
    stocks?: any[];
}
export declare class DatabaseSeeder {
    static seedDatabase(data?: SeedData): Promise<void>;
    private static seedNews;
    private static seedWeather;
    private static seedStocks;
    static clearAllData(): void;
    static getDataCounts(): {
        news: number;
        weather: number;
        stocks: number;
    };
}
export {};
