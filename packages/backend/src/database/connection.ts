import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(__dirname, '../../data/campusiq.db');

export class DatabaseConnection {
  private static instance: Database.Database | null = null;

  public static getInstance(): Database.Database {
    if (!this.instance) {
      const dataDir = path.dirname(DB_PATH);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      this.instance = new Database(DB_PATH);
      this.instance.pragma('journal_mode = WAL');
      this.instance.pragma('foreign_keys = ON');
      
      this.runMigrations();
    }
    return this.instance;
  }

  private static runMigrations(): void {
    const db = this.instance!;
    const migrationsDir = path.join(__dirname, 'migrations');
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT UNIQUE NOT NULL,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    if (!fs.existsSync(migrationsDir)) {
      return;
    }

    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    const executedMigrations = db.prepare('SELECT filename FROM migrations').all() as { filename: string }[];
    const executedSet = new Set(executedMigrations.map(m => m.filename));

    for (const file of migrationFiles) {
      if (!executedSet.has(file)) {
        const migrationPath = path.join(migrationsDir, file);
        const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');
        
        console.log(`Running migration: ${file}`);
        db.exec(migrationSQL);
        
        db.prepare('INSERT INTO migrations (filename) VALUES (?)').run(file);
        console.log(`Migration completed: ${file}`);
      }
    }
  }

  public static close(): void {
    if (this.instance) {
      this.instance.close();
      this.instance = null;
    }
  }
}

export function getDatabase(): Database.Database {
  return DatabaseConnection.getInstance();
}