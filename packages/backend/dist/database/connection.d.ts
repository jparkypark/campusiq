import Database from 'better-sqlite3';
export declare class DatabaseConnection {
    private static instance;
    static getInstance(): Database.Database;
    private static runMigrations;
    static close(): void;
}
export declare function getDatabase(): Database.Database;
