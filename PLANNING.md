Create a SQLite db with the following tables
  - `News`: `id`, `headline`, `location`, `date`
  - `Weather`: `id`, `location`, `temperature`, `date`
  - `Stocks`: `id`, `company`, `price`, `date`

3 backend services to fetch data
  - Use **NewsAPI** to fetch the top 10 news stories.  
    **API Key**: `64bbfa65330e4d838bf9a197505b2e01`
  - Use **OpenWeatherMap** to fetch weather data for the location(s) mentioned in the news.  
     **API Key**: `b478e44facd0c82ef304e04c80ca9e0f`
  - Use **Tiingo** to fetch stock prices for companies mentioned in the news.  
     If no specific company is mentioned, default to the **S&P 500**.  
     **API Key**: `27465c83310d7739ab0767eb939a179db9241985`

UI
  - News headlines
    - Related weather data
    - Related stock data
  - Allow user to filter by selecting a specific date within the past week
