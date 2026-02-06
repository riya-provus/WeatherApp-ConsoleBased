# Weather Application (Node.js Console App)

A console-based Weather Application built using Node.js that allows users to fetch real-time and date-based weather information using the WeatherAPI. The application is fully interactive and menu-driven, running entirely in the terminal.

---

## Features
- Current weather details (temperature, humidity, location)
- Weather forecast for multiple days
- Historical weather data for a given date
- Weather alerts for a city
- Future weather predictions
- Interactive console input using readline
- Secure API key handling using environment variables

---

## Tech Stack
- Node.js
- JavaScript
- WeatherAPI
- dotenv
- readline (Node.js core module)

---

## Project Structure
```
WeatherApplication/
│── WeatherApp.js
│── .env
│── package.json
│── README.md
```

---

## Prerequisites
- Node.js installed on your system
- WeatherAPI key (https://www.weatherapi.com/)

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Create `.env` file
Create a file named `.env` in the project root directory and add:

```env
APIKEY=your_weatherapi_key_here
```

⚠️ Important:
- Do not add quotes around the API key
- Do not commit the `.env` file
- Add `.env` to `.gitignore`

---

### 3. Run the application
```bash
node WeatherApp.js
```

---

## How the Application Works

1. The application displays a menu with available weather domains:
   - Current weather
   - Forecast
   - History
   - Alerts
   - Future
2. The user selects a domain by entering the corresponding number.
3. The user enters a city name.
4. Additional input is requested if required:
   - Date (for history and future)
   - Number of days (for forecast)
5. The application fetches data from WeatherAPI.
6. Weather details are displayed in a readable format in the console.

---

## Sample Output
```
****** CURRENT WEATHER Details *****
City Name      : Pune, India
Temperature of city: 30.6°C
Humidity   : 19%
```

---

## Error Handling
- Validates user input
- Displays API error messages if the request fails
- Prevents application crash on invalid data

---

## Notes
- Ensure an active internet connection
- Restart the app after updating the `.env` file
- Uses async/await and Promises for asynchronous operations

---

## Author
Riya Jadhav
