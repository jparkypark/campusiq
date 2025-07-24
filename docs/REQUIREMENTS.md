# News, Weather, and Stock Integration Application

## Objective

Build an application that integrates data from multiple APIs to display the top news stories of the day, along with relevant weather and stock market information, using an in-memory SQLite (or similar) database for managing data.

This task is designed to evaluate your problem-solving skills, resourcefulness, and ability to work with live data and databases while creating a meaningful presentation layer.

---

## Requirements

### Data Retrieval

1. **Fetch Live Data**
   - Use **NewsAPI** to fetch the top 10 news stories.  
     **API Key**: `64bbfa65330e4d838bf9a197505b2e01`
   - Use **OpenWeatherMap** to fetch weather data for the location(s) mentioned in the news.  
     **API Key**: `b478e44facd0c82ef304e04c80ca9e0f`
   - Use **Tiingo** to fetch stock prices for companies mentioned in the news.  
     If no specific company is mentioned, default to the **S&P 500**.  
     **API Key**: `27465c83310d7739ab0767eb939a179db9241985`

---

### Database Layer

2. **Use SQLite or Any Fast Alternative**
   - Implement a database to store and manage fetched data during runtime.
   - Define tables:
     - `News`: `id`, `headline`, `location`, `date`
     - `Weather`: `id`, `location`, `temperature`, `date`
     - `Stocks`: `id`, `company`, `price`, `date`

3. **Populate Data**
   - Store API data into the SQLite tables at runtime.
   - Establish logical relationships between data:
     - Link weather to locations in news.
     - Link stocks to companies mentioned in news.

4. **Query Data**
   - Retrieve and display:
     - Top 5 news headlines
     - Weather data for the first location mentioned
     - Stock prices for mentioned companies (or the S&P 500)

---

### User Interface

5. **Create a Simple Interface**
   - Display:
     - News headlines
     - Related weather data
     - Related stock data
   - Allow user to filter by selecting a specific date within the past week

---

## Simplifications

6. **SQLite In-Memory Mode**
   - Use SQLite’s `:memory:` mode to simplify setup
   - All data will exist only during the program’s runtime

7. **Focus**
   - Avoid unnecessary complexity (e.g., no Docker or containerization)

---

## Purpose and Guidance

This exercise is designed to simulate real-world problem-solving. It’s not about completing every aspect perfectly, but about showing your approach, thought process, and ability to work with new tools.

1. **Be Resourceful**
   - Use any online tools, libraries, or frameworks that help you succeed
   - Collaboration is encouraged—ask peers or mentors for help, as in real-world teams

2. **Be Creative**
   - Focus on creating a meaningful, functional result with available tools and data

3. **Be Practical**
   - Prioritize simplicity and clarity
   - Use well-structured code
   - Make intentional trade-offs when needed

---

## Tools

- You may use **any programming language or framework**
- **SQLite** is bundled with Python and requires no extra setup, making it an ideal choice