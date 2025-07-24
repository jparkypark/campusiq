-- Initial database schema for CampusIQ Dashboard

-- News table for storing news articles
CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  url TEXT UNIQUE NOT NULL,
  url_to_image TEXT,
  published_at DATETIME NOT NULL,
  source_name TEXT NOT NULL,
  author TEXT,
  category TEXT DEFAULT 'general',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Weather table for storing weather data
CREATE TABLE weather (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  location TEXT NOT NULL,
  country TEXT,
  latitude REAL,
  longitude REAL,
  temperature REAL NOT NULL,
  feels_like REAL,
  humidity INTEGER,
  pressure REAL,
  visibility REAL,
  wind_speed REAL,
  wind_direction INTEGER,
  weather_main TEXT NOT NULL,
  weather_description TEXT NOT NULL,
  icon TEXT,
  recorded_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Stocks table for storing stock price data
CREATE TABLE stocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  symbol TEXT NOT NULL,
  company_name TEXT NOT NULL,
  current_price REAL NOT NULL,
  price_change REAL,
  price_change_percent REAL,
  previous_close REAL,
  market_cap REAL,
  volume INTEGER,
  high_52week REAL,
  low_52week REAL,
  market_status TEXT DEFAULT 'closed',
  recorded_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_news_published_at ON news(published_at DESC);
CREATE INDEX idx_news_source ON news(source_name);
CREATE INDEX idx_weather_location ON weather(location);
CREATE INDEX idx_weather_recorded_at ON weather(recorded_at DESC);
CREATE INDEX idx_stocks_symbol ON stocks(symbol);
CREATE INDEX idx_stocks_recorded_at ON stocks(recorded_at DESC);

-- Create triggers to update the updated_at timestamp
CREATE TRIGGER update_news_timestamp 
  AFTER UPDATE ON news
BEGIN
  UPDATE news SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_weather_timestamp 
  AFTER UPDATE ON weather
BEGIN
  UPDATE weather SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_stocks_timestamp 
  AFTER UPDATE ON stocks
BEGIN
  UPDATE stocks SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;