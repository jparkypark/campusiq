"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
exports.getDatabase = getDatabase;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const DB_PATH = path_1.default.join(__dirname, '../../data/campusiq.db');
class DatabaseConnection {
    static getInstance() {
        if (!this.instance) {
            const dataDir = path_1.default.dirname(DB_PATH);
            if (!fs_1.default.existsSync(dataDir)) {
                fs_1.default.mkdirSync(dataDir, { recursive: true });
            }
            this.instance = new better_sqlite3_1.default(DB_PATH);
            this.instance.pragma('journal_mode = WAL');
            this.instance.pragma('foreign_keys = ON');
            this.runMigrations();
        }
        return this.instance;
    }
    static runMigrations() {
        const db = this.instance;
        const migrationsDir = path_1.default.join(__dirname, 'migrations');
        db.exec(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT UNIQUE NOT NULL,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        if (!fs_1.default.existsSync(migrationsDir)) {
            return;
        }
        const migrationFiles = fs_1.default.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.sql'))
            .sort();
        const executedMigrations = db.prepare('SELECT filename FROM migrations').all();
        const executedSet = new Set(executedMigrations.map(m => m.filename));
        for (const file of migrationFiles) {
            if (!executedSet.has(file)) {
                const migrationPath = path_1.default.join(migrationsDir, file);
                const migrationSQL = fs_1.default.readFileSync(migrationPath, 'utf-8');
                console.log(`Running migration: ${file}`);
                db.exec(migrationSQL);
                db.prepare('INSERT INTO migrations (filename) VALUES (?)').run(file);
                console.log(`Migration completed: ${file}`);
            }
        }
    }
    static close() {
        if (this.instance) {
            this.instance.close();
            this.instance = null;
        }
    }
}
exports.DatabaseConnection = DatabaseConnection;
DatabaseConnection.instance = null;
function getDatabase() {
    return DatabaseConnection.getInstance();
}
