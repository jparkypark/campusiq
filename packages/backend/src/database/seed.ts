import { getDatabase } from './connection';

const db = getDatabase();

interface SeedData {
  news?: any[];
  weather?: any[];
  stocks?: any[];
}

export class DatabaseSeeder {
  static async seedDatabase(data: SeedData = {}): Promise<void> {
    console.log('Starting database seeding...');

    try {
      if (data.news && data.news.length > 0) {
        await this.seedNews(data.news);
      }

      if (data.weather && data.weather.length > 0) {
        await this.seedWeather(data.weather);
      }

      if (data.stocks && data.stocks.length > 0) {
        await this.seedStocks(data.stocks);
      }

      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  }

  private static async seedNews(newsData: any[]): Promise<void> {
    const insertNews = db.prepare(`
      INSERT OR REPLACE INTO news (
        title, description, content, url, url_to_image, 
        published_at, source_name, author, category
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((news: any[]) => {
      for (const article of news) {
        insertNews.run(
          article.title,
          article.description,
          article.content,
          article.url,
          article.urlToImage,
          article.publishedAt,
          article.source?.name || 'Unknown',
          article.author,
          article.category || 'general'
        );
      }
    });

    insertMany(newsData);
    console.log(`Seeded ${newsData.length} news articles`);
  }

  private static async seedWeather(weatherData: any[]): Promise<void> {
    const insertWeather = db.prepare(`
      INSERT OR REPLACE INTO weather (
        location, country, latitude, longitude, temperature, feels_like,
        humidity, pressure, visibility, wind_speed, wind_direction,
        weather_main, weather_description, icon, recorded_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((weather: any[]) => {
      for (const data of weather) {
        insertWeather.run(
          data.location,
          data.country,
          data.latitude,
          data.longitude,
          data.temperature,
          data.feelsLike,
          data.humidity,
          data.pressure,
          data.visibility,
          data.windSpeed,
          data.windDirection,
          data.weatherMain,
          data.weatherDescription,
          data.icon,
          data.recordedAt
        );
      }
    });

    insertMany(weatherData);
    console.log(`Seeded ${weatherData.length} weather records`);
  }

  private static async seedStocks(stocksData: any[]): Promise<void> {
    const insertStock = db.prepare(`
      INSERT OR REPLACE INTO stocks (
        symbol, company_name, current_price, price_change, price_change_percent,
        previous_close, market_cap, volume, high_52week, low_52week,
        market_status, recorded_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((stocks: any[]) => {
      for (const stock of stocks) {
        insertStock.run(
          stock.symbol,
          stock.companyName,
          stock.currentPrice,
          stock.priceChange,
          stock.priceChangePercent,
          stock.previousClose,
          stock.marketCap,
          stock.volume,
          stock.high52Week,
          stock.low52Week,
          stock.marketStatus || 'closed',
          stock.recordedAt
        );
      }
    });

    insertMany(stocksData);
    console.log(`Seeded ${stocksData.length} stock records`);
  }

  static clearAllData(): void {
    console.log('Clearing all database data...');
    
    db.exec('DELETE FROM news');
    db.exec('DELETE FROM weather');  
    db.exec('DELETE FROM stocks');
    
    console.log('All data cleared successfully');
  }

  static getDataCounts(): { news: number; weather: number; stocks: number } {
    const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get() as { count: number };
    const weatherCount = db.prepare('SELECT COUNT(*) as count FROM weather').get() as { count: number };
    const stocksCount = db.prepare('SELECT COUNT(*) as count FROM stocks').get() as { count: number };

    return {
      news: newsCount.count,
      weather: weatherCount.count,
      stocks: stocksCount.count
    };
  }
}